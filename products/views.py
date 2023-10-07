from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics, status
from .serializers import *
from .models import *

@api_view(["GET"])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get_product(request, name):
    products = Product.objects.filter(name=name)
    serializer = ProductSerializer(products, many=False)
    return Response(serializer.data)

@api_view(["POST"])
def create_product(request, pk):
    if request.user.is_staff:
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.data, status=status.HTTP_401_NOT_UNAUTHORIZED)

@api_view(["POST"])
def edit_product(request, pk):
    product=Product.objects.get(id=pk)
    if request.user.is_staff:
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.data, status=status.HTTP_401_NOT_UNAUTHORIZED)

@api_view(["DELETE"])
def delete_product(request, pk):
    product = Product.object.get(id=pk)
    if requset.user.is_staff:
        product.delete()
        return Response(status=status=status.HTTP_204_NO_CONTENT)
    else:

        return Response(status=status=status.HTTP_401_NOT_UNAUTHORIZED)
