from rest_framework import serializers
from ..models import User


class UserSerializer(serializers.ModelSerializer):
    def to_representation(self, obj: User):
        rep = super().to_representation(obj)
        rep['avatar'] = obj.get_avatar(self.context.get('request'))
        return rep

    def save(self, **kwargs):
        instance = super().save(**kwargs)
        if 'password' in self.validated_data:
            instance.set_password(self.validated_data.get('password'))
            instance.save()
        return instance

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'nickname', 'password', 'avatar', 'oauth_type')
        extra_kwargs = {
            'id': {'read_only': True},
            'nickname': {'read_only': True},
            'password': {'write_only': True},
            'oauth_type': {'read_only': True},
        }
