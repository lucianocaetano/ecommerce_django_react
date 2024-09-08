from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics, status, viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import *
from .models import *

class ReviewRetrieveAPIView(generics.RetrieveAPIView):
    queryset=Review.objects.all()
    serializer_class=ReviewSerializer

class ProductModelViewSet(viewsets.ModelViewSet):
    queryset=Product.objects.all().order_by("slug")
    serializer_class=ProductSerializer
    lookup_field="slug"

    def get_queryset(self):
        queryset = super().get_queryset()
        category_name = self.request.query_params.get('category__name', None)

        if category_name:
            queryset = queryset.filter(category__name=category_name) | queryset.filter(category__parent__name=category_name)
        return queryset

class ListSearchProductAPIView(generics.ListAPIView):
    queryset=Product.objects.all()
    serializer_class=ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ('name', 'description')

class ProductRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class=ProductSerializer
    pagination_class=None

    lookup_field = 'slug'

    def get_queryset(self):
        return self.serializer_class.Meta.model.objects.all()

class CategoriesListAPIView(generics.ListAPIView):
    pagination_class=None
    queryset=Category.objects.filter(parent=None)
    serializer_class=CategoryWithChildrenSerializer

class CategoriesNotParentListAPIView(generics.ListAPIView):
    pagination_class=None
    queryset=Category.objects.filter(parent__isnull=False)
    serializer_class=CategorySerializer

    def get_queryset (self):

        return super().get_queryset()
