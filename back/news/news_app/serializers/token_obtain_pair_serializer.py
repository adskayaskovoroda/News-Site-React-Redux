from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['id'] = self.user.id
        data['nickname'] = self.user.nickname
        data['avatar'] = self.user.get_avatar(self.context.get('request'))

        return data
