import re
from django.db import models, transaction
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


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
    
    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('name', re.split(r'@', email, 1)[0])
        return self._create_user(email, password, **extra_fields)

class User(AbstractBaseUser):
    email = models.EmailField(max_length=50)
    avatar = models.ImageField(upload_to='user_avatars')
    name = models.CharField(max_length=25)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return f'{self.name} ({self.email})'
