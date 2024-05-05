from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

api_prefix="api/v1/"

urlpatterns = [
    path('admin/', admin.site.urls),
    path("user/", include("user.urls")),
    path(api_prefix, include("products.urls"))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
