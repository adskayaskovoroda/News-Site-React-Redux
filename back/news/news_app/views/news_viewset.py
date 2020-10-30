from rest_framework import viewsets, filters
from rest_framework.response import Response

from ..serializers import NewsSerializer
from ..models import News


class NewsSearch(filters.SearchFilter):
    def get_search_fields(self, view, request):
        filter_type = request.query_params.get('filter')
        if filter_type == 'all':
            return ['title', 'content', 'author__name', 'tags__title']
        if filter_type == 'author':
            return ['author__name']
        if filter_type == 'tags':
            return ['tags__title']
        return super().get_search_fields(view, request)

class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    filter_backends = [NewsSearch, filters.OrderingFilter]
    ordering = ['id']