from rest_framework import serializers
from ..models import News


class NewsSerializer(serializers.Serializer):
    
    ID = serializers.IntegerField(read_only=True, required=False)
    title = serializers.CharField(max_length=50)
    image = serializers.CharField(max_length=250)
    content = serializers.CharField()
    author_id = serializers.IntegerField()
    tags_list = serializers.ListField(
        child = serializers.CharField(max_length=25),
        required = False,
    )

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass