from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User
from .serializers import RegisterUserSerializer, CustomTokenObtainPairSerializer


@api_view(["POST"])
def register(request):
    data=request.data

    serializer=RegisterUserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response()
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class=CustomTokenObtainPairSerializer
