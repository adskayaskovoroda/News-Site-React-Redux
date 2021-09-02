import requests
from typing import TypedDict
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from ..models import User


class UserInfo(TypedDict):
    email: str
    username: str
    avatar: str


class LoginGoogleUserView(APIView):
    def get_access_token_from_code(self, code: str) -> str:
        response = requests.post(
            'https://oauth2.googleapis.com/token',
            data={
                'code': code,
                'client_id': settings.GOOGLE_CLIENT_ID,
                'client_secret': settings.GOOGLE_CLIENT_SECRET,
                'grant_type': 'authorization_code'
            }
        )

        if not response.ok:
            raise AuthenticationFailed()

        response = response.json()

        return f'{response["token_type"]} {response["access_token"]}'

    def get_google_user_info(self, token: str) -> UserInfo:
        response = requests.get(
            'https://openidconnect.googleapis.com/v1/userinfo',
            headers={
                'Authorization': token
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
        user = User.objects.get_or_create(
            **self.get_google_user_info(
                self.get_access_token_from_code(request.data['code'])
            )
        )

        token = RefreshToken.for_user(user)

        return Response({
            'refresh': str(token),
            'access': str(token.access_token),
            'id': user.id,
            'nickname': user.nickname,
            'avatar': user.get_avatar(request)
        }, status=status.HTTP_200_OK)
