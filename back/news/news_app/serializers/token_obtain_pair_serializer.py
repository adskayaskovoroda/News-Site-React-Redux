from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        data['id'] = self.user.id
        data['full_name'] = self.user.full_name
        avatar_url = str(self.user.avatar)
        if avatar_url.startswith('https://'):
            data['avatar'] = avatar_url
        else:
            request = self.context.get('request')
            data['avatar'] = request.build_absolute_uri(self.user.avatar.url)
        return data