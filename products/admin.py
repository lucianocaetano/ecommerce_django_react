from django.contrib import admin
from .models import Product, Review, Image, Category

admin.site.register(Review)
admin.site.register(Category)
admin.site.register(Image)
admin.site.register(Product)
