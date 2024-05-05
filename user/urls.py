from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from .views import *

urlpatterns = [
    path("register/", register),
    path("login/", CustomTokenObtainPairView.as_view()),
    path("refresh/", TokenRefreshView.as_view()),
    path("retrieve/<pk>", UserRetrieveAPIView.as_view(), name="user-detail")
]
