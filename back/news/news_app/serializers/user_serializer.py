from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from ..models import User

class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    def get_avatar(self, obj):
        request = self.context.get('request')
        avatar_url = request.build_absolute_uri(obj.avatar.url)
        avatar_url = str(obj.avatar)
        if avatar_url.startswith('https://'):
            return avatar_url
        avatar_url = request.build_absolute_uri(obj.avatar.url)
        return avatar_url

    class Meta:
        model = User
        fields = ['id','email','full_name','avatar','password']
        extra_kwargs = {'password': {'write_only': True}}
