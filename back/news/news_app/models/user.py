import re
from django.db import models, transaction
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, AbstractUser


class UserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        try:
            with transaction.atomic():
                user = self.model(email=email, **extra_fields)
                user.set_password(password)
                user.save(using=self._db)
                return user
        except:
            raise

    def create_user(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('full_name', re.split(r'@', email, 1)[0])
        extra_fields.setdefault('username', extra_fields['full_name'])
        extra_fields.setdefault('avatar', 'user_avatars/default.png')
        return self._create_user(email, password, **extra_fields)
 
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('full_name', re.split(r'@', email, 1)[0])
        extra_fields.setdefault('username', extra_fields['full_name'])
        extra_fields.setdefault('avatar', 'user_avatars/default.png')
        return self._create_user(email, password, **extra_fields)

class User(AbstractUser):
    email = models.EmailField(max_length=50, unique=True)
    avatar = models.ImageField(upload_to='user_avatars', null=True, blank=True)
    full_name = models.CharField(max_length=100, null=True, blank=True)

    username = models.CharField(max_length=100, null=True, blank=True)
    first_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f'{self.full_name} ({self.email})'