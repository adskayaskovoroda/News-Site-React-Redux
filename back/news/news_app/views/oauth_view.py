import requests
from typing import TypedDict
from django.db.models import Q
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from ..models import User
from ..serializers import UserSerializer


class UserInfo(TypedDict):
    email: str
    username: str
    avatar: str


class LoginGoogleUserView(APIView):
    def get_google_user_info(self, token: str) -> UserInfo:
        response = requests.get(
            'https://openidconnect.googleapis.com/v1/userinfo',
            headers={
                'Authorization': f'Bearer {token}'
            }
        )

        if not response.ok:
            raise AuthenticationFailed()

        response = response.json()

        return {
            'email': response['email'],
            'username': response['nickname'] if response.get('nickname') else response['name'],
            'avatar': response['picture']
        }

    def post(self, request: Request) -> Response:
        user_info = self.get_google_user_info(request.data['token'])
        user, _ = User.objects.get_or_create(
            email=user_info.pop('email'),
            defaults={**user_info, 'oauth_type': User.OAuthType.GOOGLE}
        )
        serializer = UserSerializer(user, context={'request': request})

        token = RefreshToken.for_user(user)

        return Response({
            'refresh': str(token),
            'access': str(token.access_token),
            'user': serializer.data,
        }, status=status.HTTP_200_OK)
