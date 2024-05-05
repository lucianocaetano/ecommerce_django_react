from django.urls import path, include
from .views import ProductModelViewSet, ReviewRetrieveAPIView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("", ProductModelViewSet, basename="product")

urlpatterns = [
    path("products/", include(router.urls)),
    path("review/<pk>/", ReviewRetrieveAPIView.as_view(), name="review-detail")

]
