from django.db.models import F, Case, When, Q
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser
from ..serializers import PostSerializer
from ..models import Post


class PostSearch(filters.SearchFilter):
    def get_search_fields(self, view, request):
        filter_type = request.query_params.get('filter')

        if filter_type == 'all':
            return ['title', 'content', 'author_nickname', 'tags__title']
        if filter_type == 'author':
            return ['author_nickname']
        if filter_type == 'tags':
            return ['tags__title']
        if filter_type == 'api_user_id':
            return ['author__id']

        return super().get_search_fields(view, request)

    def filter_queryset(self, request, queryset, view):
        filter_type = request.query_params.get('filter')
        if filter_type in ['all', 'author']:
            queryset = queryset.annotate(
                author_nickname=Case(
                    When(
                        Q(author__username=''),
                        then=F('author__email')
                    ),
                    default=F('author__username')
                )
            )

        return super().filter_queryset(request, queryset, view)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (PostSearch, filters.OrderingFilter)
    parser_classes = (MultiPartParser,)
    ordering = ('-id',)
