from rest_framework import serializers
from django.db.models import Q
from django.contrib.postgres.aggregates.general import ArrayAgg

from ..models import News, Tag
from .tag_serializer import TagSerializer


class NewsSerializer(serializers.ModelSerializer):

    tagsList = serializers.SerializerMethodField()
    def get_tagsList(self, obj):
            query = Q(id=-1)
            for tag in obj.tags.all():
                query.add(Q(id=tag.id), Q.OR)
            tags_data = Tag.objects.filter(query).aggregate(arr=ArrayAgg('title'))
            return tags_data['arr']

    class Meta:
        model = News
        fields = ['title', 'image', 'content', 'author', 'tagsList']
