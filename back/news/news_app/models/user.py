from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractUser


class UserManager(BaseUserManager):
    def create_user(self, email: str, password: str, **extra_fields):
        if not email or (extra_fields.get('oauth_type', User.OAuthType.NONE) == User.OAuthType.NONE and not password):
            raise ValueError('Email and password must be provided')

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
    avatar = models.ImageField(upload_to='user_avatars', default='user_avatars/default.png')
    first_name = None
    last_name = None

    class OAuthType(models.IntegerChoices):
        NONE = 0
        GOOGLE = 1

    oauth_type = models.IntegerField(choices=OAuthType.choices, default=OAuthType.NONE)

    @property
    def nickname(self):
        return self.username or self.email

    def get_avatar(self, request):
        if self.oauth_type != self.OAuthType.NONE:
            return self.avatar
        return request.build_absolute_uri(self.avatar.url)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ()

    def __str__(self):
        return self.email
