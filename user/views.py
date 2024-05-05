from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from .models import User
from .serializers import RegisterUserSerializer, CustomTokenObtainPairSerializer, UserSerializer

class UserRetrieveAPIView(generics.RetrieveAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer

@api_view(["POST"])
def register(request):
    data=request.data

    serializer=RegisterUserSerializer(data=data)
    if serializer.is_valid():
        serializer.save(password=make_password(data["password"]))
        return Response()
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class=CustomTokenObtainPairSerializer
