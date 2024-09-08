from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'', UserModelViewSet, basename="user")

urlpatterns = [
    path("login/", CustomTokenObtainPairView.as_view()),
    path("register/", register),
    path("refresh/", TokenRefreshView.as_view()),
    path("", include(router.urls))
]
