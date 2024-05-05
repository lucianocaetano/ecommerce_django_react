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

    class Meta:
        model = Product
        fields = "__all__"
