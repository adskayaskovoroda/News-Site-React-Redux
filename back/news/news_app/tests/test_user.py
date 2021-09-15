from rest_framework.test import APITestCase
from ..models import User

LOCALHOST = 'http://127.0.0.1'


class MockImage:
    def __init__(self, image_name: str):
        self.image_name = image_name
        # to trick django that we actually have the file
        self._committed = True

    def __str__(self):
        return self.image_name

    @property
    def url(self):
        return self.image_name


class MockRequest:
    @staticmethod
    def build_absolute_uri(url):
        return f'{LOCALHOST}/{url}'


class UserNicknameTestCase(APITestCase):
    def test_email_no_username(self):
        data = {
            'email': 'user@mail.com'
        }

        user = User.objects.create(**data)

        self.assertEqual(user.nickname, data['email'])

    def test_email_username(self):
        data = {
            'email': 'user@mail.com',
            'username': 'user',
        }

        user = User.objects.create(**data)

        self.assertEqual(user.nickname, data['username'])


class UserGetAvatarTestCase(APITestCase):
    def test_default_user(self):
        data = {
            'email': 'default_user@mail.com',
            'avatar': MockImage('some_image.jpg')
        }

        user = User.objects.create(**data)

        self.assertEqual(user.get_avatar(MockRequest), f'{LOCALHOST}/{data["avatar"]}')

    def test_google_user(self):
        data = {
            'email': 'google_user@gmail.com',
            'oauth_type': User.OAuthType.GOOGLE,
            'avatar': MockImage('http://google.image.whatever.avatar.jpg')
        }

        user = User.objects.create(**data)

        self.assertEqual(user.get_avatar(MockRequest), str(data['avatar']))
