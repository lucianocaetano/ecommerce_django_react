from rest_framework import serializers
from .models import *


class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(
        view_name='user-detail',
        read_only=True
    )

    class Meta:
        model = Review
        fields = "__all__"

    def get_avatar(self, obj):
        return obj.user.avatar.url

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model=Image
        fields=("image",)

class CategorySerializer(serializers.ModelSerializer):
    parent = serializers.SerializerMethodField()

    class Meta:
        model=Category
        fields=("name", "id", "parent")

    def get_parent(self, obj):
        return obj.parent.name

class CategoryWithChildrenSerializer(serializers.ModelSerializer):

    children = serializers.SerializerMethodField()

    class Meta:
        model=Category
        fields=("name", "children", "id")

    def get_children(self, obj):
        children = CategorySerializer(obj.children.all(), many=True)
        return children.data

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    reviews_set = serializers.HyperlinkedRelatedField(
        view_name='review-detail',
        many=True,
        read_only=True
    )

    url = serializers.HyperlinkedIdentityField(
        view_name='product-detail',
        lookup_field='slug'
    )

    images=ImageSerializer(many=True)
    category=CategorySerializer()

    class Meta:
        model = Product
        fields = ("slug", "reviews_set", "user", "name", "category", "description", "rating", "num_reviews", "price", "in_stock", "created", "id", "url", "images", "category")
