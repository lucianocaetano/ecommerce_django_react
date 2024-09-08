from django.shortcuts import render
from rest_framework import decorators, generics, permissions, status, views
from rest_framework.response import Response
from rest_framework_simplejwt import authentication
from products.models import Product
from .models import Cart, CartItem
from .permissions import IsOwner
from .serializers import (CartItemCreateSerializer, CartItemSerializer, CartSerializer)

class GetCart(views.APIView):
    permission_classes=(permissions.IsAuthenticated,)
    serializer_class=CartSerializer

    def get_obj(self):
        cart=self.serializer_class.Meta.model.objects.filter(user=self.request.user).first()
        return cart

    def get(self, request, *args, **kwargs):
        cart = self.get_obj()

        if(not cart):
            return Response({"cart": None}, status=status.HTTP_404_NOT_FOUND)

        cart = self.serializer_class(cart)
        return Response({"cart": cart.data})


class CartUpdate(generics.UpdateAPIView):
    permission_classes=(IsOwner, permissions.IsAuthenticated)
    serializer_class=CartSerializer

    def get_queryset(self):
        return self.serializer_class.Meta.model.objects.all()


class CartCreate(generics.CreateAPIView):
    serializer_class=CartSerializer
    permission_classes=(permissions.IsAuthenticated, IsOwner)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# cart items views
class CartItemList(generics.ListAPIView):
    pagination_class=None
    permission_classes=(permissions.IsAuthenticated,)
    serializer_class=CartItemSerializer

    def get_queryset(self):
        return self.serializer_class.Meta.model.objects.filter(user=self.request.user)

class CartItemCreate(generics.CreateAPIView):
    permission_classes=(permissions.IsAuthenticated,)
    serializer_class=CartItemCreateSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CartItemUpdate(generics.UpdateAPIView):
    permission_classes=(permissions.IsAuthenticated, IsOwner)
    serializer_class=CartItemSerializer

    def get_queryset(self):
        return self.serializer_class.Meta.model.objects.filter(user=self.request.user)

class CartItemDestroy(generics.DestroyAPIView):
    permission_classes=(permissions.IsAuthenticated, IsOwner)
    serializer_class=CartItemSerializer

    def perform_destroy(self, serializer):
        serializer.delete()

    def get_queryset(self):
        return self.serializer_class.Meta.model.objects.filter(user=self.request.user)
