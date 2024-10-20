from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

api_prefix="api/v1/"

urlpatterns = [
    path('admin/', admin.site.urls),
    path("user/", include("user.urls")),
    path(api_prefix+"product/", include("products.urls")),
    path(api_prefix+"cart/", include("carts.urls")),
    path(api_prefix+"checkout/", include("checkout.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
