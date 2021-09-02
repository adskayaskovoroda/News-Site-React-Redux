from rest_framework import serializers
from ..models import User


class UserSerializer(serializers.ModelSerializer):
    def to_representation(self, obj: User):
        rep = super().to_representation(obj)
        rep['avatar'] = obj.get_avatar(self.context.get('request'))
        return rep

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'nickname', 'password', 'avatar')
        extra_kwargs = {
            'id': {'read_only': True},
            'email': {'write_only': True},
            'username': {'write_only': True},
            'nickname': {'read_only': True},
            'password': {'write_only': True},
        }
