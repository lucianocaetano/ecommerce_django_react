from .views import GetCart, CartUpdate, CartCreate, CartItemList, CartItemCreate, CartItemUpdate, CartItemDestroy
from django.urls import path

urlpatterns = [
    path("get_cart/", GetCart.as_view()),
    path("create_cart/", CartCreate.as_view()),
    path("update_cart/<int:pk>/", CartUpdate.as_view()),
    # cart items urls
    path("cart_items/", CartItemList.as_view()),
    path("cart_items_create/", CartItemCreate.as_view()),
    path("cart_items_delete/<int:pk>/", CartItemDestroy.as_view()),
    path("cart_items_update/<int:pk>/", CartItemUpdate.as_view())
]

