from rest_framework import serializers
from products.serializers import ProductSerializer
from .models import Cart, CartItem

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cart
        fields=["count", "subtotal", "id"]

class CartItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model=CartItem
        fields=("product", "quantity", "id")

class CartItemSerializer(serializers.ModelSerializer):
    product=ProductSerializer()
    class Meta:
        model=CartItem
        fields=("product", "quantity", "id")

