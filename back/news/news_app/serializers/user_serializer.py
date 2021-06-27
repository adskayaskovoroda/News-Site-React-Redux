from rest_framework import serializers
from ..models import User


class UserSerializer(serializers.ModelSerializer):
    def to_representation(self, obj: User):
        rep = super().to_representation(obj)
        rep['avatar'] = obj.get_avatar(self.context.get('request'))
        return rep

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'full_name', 'avatar')
        extra_kwargs = {
            'full_name': {'read_only': True},
            'id': {'read_only': True},
            'password': {'write_only': True},
        }
