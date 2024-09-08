from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("", ProductModelViewSet, basename="product")

urlpatterns = [
    path("products/", include(router.urls)),
    path("categories/", CategoriesListAPIView.as_view(), name="categories-list"),
    path("categories_not_parent/", CategoriesNotParentListAPIView.as_view(), name="categories-list-not-parent"),
    path("search/", ListSearchProductAPIView.as_view(), name="search_product-list"),
    path("review/<int:pk>/", ReviewRetrieveAPIView.as_view(), name="review-detail"),
    path("<str:slug>/", ProductRetrieveAPIView.as_view(), name="review-detail"),
]
