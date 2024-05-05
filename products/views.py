from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics, status, viewsets
from core.pagination import CustomPagination
from .serializers import *
from .models import *

class ReviewRetrieveAPIView(generics.RetrieveAPIView):
    queryset=Review.objects.all()
    serializer_class=ReviewSerializer

class ProductModelViewSet(viewsets.ModelViewSet):
    queryset=Product.objects.all().order_by("slug")
    serializer_class=ProductSerializer
    lookup_field="slug"
