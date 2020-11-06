from rest_framework import serializers
from django.db.models import Q
from django.contrib.postgres.aggregates.general import ArrayAgg
from ..models import *


class PostSerializer(serializers.ModelSerializer):
    author_data = serializers.SerializerMethodField()
    def get_author_data(self, obj):
        request = self.context.get('request')
        author = User.objects.get(pk=obj.author.id)
        if not author.avatar:
            avatar_url = None
        else:
            avatar_url = request.build_absolute_uri(author.avatar.url)
        author_data = {
            'id': author.id,
            'email': author.email,
            'full_name': author.full_name,
            'avatar': avatar_url,
        }
        return author_data

    tags_data = serializers.SerializerMethodField()
    def get_tags_data(self, obj):
        query = Q(id=-1)
        for tag in obj.tags.all():
            query.add(Q(id=tag.id), Q.OR)
        tags_data = Tag.objects.filter(query).aggregate(arr=ArrayAgg('title'))
        return tags_data['arr']

    class Meta:
        model = Post
        fields = ['id','title','image','content','author_data','tags_data']
