import re
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractUser
from rest_framework.request import Request


class UserManager(BaseUserManager):
    def create_user(self, email: str, password: str, **extra_fields):
        if not email or not password:
            raise ValueError('Email and password must be provided')

        extra_fields.setdefault('username', email.split('@')[0])
        extra_fields.setdefault('avatar', 'user_avatars/default.png')

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
 
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    email = models.EmailField(max_length=32, unique=True)
    username = models.CharField(max_length=32, null=True, blank=True)
    first_name = models.CharField(max_length=32, null=True, blank=True)
    last_name = models.CharField(max_length=32, null=True, blank=True)
    avatar = models.ImageField(upload_to='user_avatars', null=True, blank=True)

    @property
    def full_name(self):
        if self.first_name is None and self.last_name is None:
            return None
        return ' '.join(filter(
            lambda el: bool(el),
            (self.first_name, self.last_name)
        ))

    def get_avatar(self, request):
        avatar_url = str(self.avatar)
        if re.match('^http[s]?://', avatar_url):
            return avatar_url
        return request.build_absolute_uri(avatar_url)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ()

    def __str__(self):
        return self.email
