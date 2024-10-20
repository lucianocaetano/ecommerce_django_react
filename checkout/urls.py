from django.urls import path
from .views import process_payment, generate_token

urlpatterns = [
    path("get_token", generate_token),
    path("proccess_payment", process_payment),
]
