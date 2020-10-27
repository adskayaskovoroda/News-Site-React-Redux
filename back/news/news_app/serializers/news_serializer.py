from rest_framework import serializers
from django.db.models import Q
from django.contrib.postgres.aggregates.general import ArrayAgg

from ..models import News, Tag, User
from .tag_serializer import TagSerializer


class NewsSerializer(serializers.ModelSerializer):

    tags_list = serializers.SerializerMethodField()
    def get_tags_list(self, obj):
        query = Q(id=-1)
        for tag in obj.tags.all():
            query.add(Q(id=tag.id), Q.OR)
        tags_data = Tag.objects.filter(query).aggregate(arr=ArrayAgg('title'))
        return tags_data['arr']

    author_data = serializers.SerializerMethodField()
    def get_author_data(self, obj):
        author = User.objects.get(pk=obj.author.id)
        author_data = {
            'id': author.id,
            'username': author.name,
        }
        return author_data

    class Meta:
        model = News
        fields = ['id','title', 'image', 'content', 'author_data', 'tags_list']
