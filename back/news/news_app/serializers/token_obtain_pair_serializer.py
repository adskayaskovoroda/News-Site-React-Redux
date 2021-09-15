from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .user_serializer import UserSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializer(self.user, context={'request': self.context['request']})
        data['user'] = serializer.data

        return data
