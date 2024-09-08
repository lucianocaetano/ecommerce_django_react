from rest_framework import pagination
from rest_framework.response import Response

class CustomPageNumberPagination(pagination.PageNumberPagination):
    page_size=9
    page_query_param = "page"

    def get_paginated_response(self, data):
        return Response({
            'results': data,
            'meta': {
                'next': self.page.next_page_number()
                if self.page.has_next() else None,
                'previous': self.page.previous_page_number()
                if self.page.has_previous() else None,
                'count': self.page.paginator.count,
                }
        })
