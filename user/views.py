from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import viewsets, filters, permissions, status
from .models import User
from .serializers import RegisterUserSerializer, CustomTokenObtainPairSerializer, UserSerializer


class UserModelViewSet(viewsets.ReadOnlyModelViewSet):
    pagination_class = None
    queryset=User.objects.all()
    serializer_class=UserSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ('name', 'last_name', 'email')

@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def register(request):
    data=request.data
    serializer=RegisterUserSerializer(data=data)
    if serializer.is_valid():
        serializer.save(password=make_password(data["password"]))
        return Response({"message": "successfully registered"})
    else:
        return Response({"error", serializer.error}, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class=CustomTokenObtainPairSerializer
