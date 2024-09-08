from django_filters import rest_framework as filters
from .models import Product

class ProductFilter(filters.FilterSet):
    category_id = filters.NumberFilter(field_name='category__id', lookup_expr='exact')
    category_parent_id = filters.NumberFilter(field_name='category__parent__id', lookup_expr='exact')

    class Meta:
        model = Product
        fields = ['category_id', 'category_parent_id']

    def filter_queryset(self, queryset):
        # Obtener los parámetros de categoría
        category_id = self.request.query_params.get('category_id')

        if category_id:
            # Filtrar por la categoría dada y su categoría padre
            category_queryset = queryset.filter(category__parent__id=category_id)
            queryset = queryset.filter(category__id=category_id) | category_queryset

        return super().filter_queryset(queryset)
