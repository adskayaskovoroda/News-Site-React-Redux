from rest_framework import serializers
from django.db.models import Q

from ..models import News, Tag
from .tag_serializer import TagSerializer


class NewsSerializer(serializers.ModelSerializer):

    tagsList = serializers.SerializerMethodField()
    def get_tagsList(self, obj):
            query = Q(id=-1)
            for tag in obj.tags.all():
                query.add(Q(id=tag.id), Q.OR)
            serialized_data = TagSerializer(Tag.objects.filter(query), many=True).data
            tags_data = []
            for item in serialized_data:
                tags_data += [dict(item)['title']]
            return tags_data

    class Meta:
        model = News
        fields = ['title', 'image', 'content', 'author', 'tagsList']
