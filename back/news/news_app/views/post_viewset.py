from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser
from django.core.exceptions import ObjectDoesNotExist

from ..serializers import PostSerializer
from ..models import Post, User, Tag


class PostSearch(filters.SearchFilter):
    def get_search_fields(self, view, request):
        filter_type = request.query_params.get('filter')
        if filter_type == 'all':
            return ['title', 'content', 'author__full_name', 'tags__title']
        if filter_type == 'author':
            return ['author__full_name']
        if filter_type == 'tags':
            return ['tags__title']
        if filter_type == 'api_user_id':
            return ['author__id']
        return super().get_search_fields(view, request)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [PostSearch, filters.OrderingFilter]
    parser_classes = [MultiPartParser]
    ordering = ['-id']

    def create(self, request):
        data = request.data
        author = User.objects.get(pk=data['author_id'])
        post = author.post_set.create(
            title=data['title'],
            content=data['content'],
            image=data['image'],
        )
        for tagTitle in data['tags'].split(' '):
            tag = self.create_tag(tagTitle)
            post.tags.add(tag)

        headers = self.get_success_headers(request.data)
        return Response({'success': 'OK'}, status=status.HTTP_201_CREATED, headers=headers)

    def create_tag(self, tagTitle):
        try:
            tag = Tag.objects.get(title=tagTitle)
        except Tag.DoesNotExist:
            tag = Tag.objects.create(title=tagTitle)
        return tag
