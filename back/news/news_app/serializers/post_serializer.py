from rest_framework import serializers
from ..models import Post, Tag
from .user_serializer import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    tags = serializers.PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all())

    def run_validation(self, data=serializers.empty):
        if 'tags' in data:
            for tag in data.getlist('tags'):
                Tag.objects.get_or_create(title=tag)
        return super().run_validation(data)

    def create(self, validated_data):
        return super().create({
            **validated_data,
            'author': self.context.get('request').user
        })

    class Meta:
        model = Post
        fields = '__all__'
        extra_kwargs = {
            'title': {'required': True},
            'content': {'required': True}
        }
