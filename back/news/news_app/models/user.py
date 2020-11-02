from django.db import models

class User(models.Model):
    login = models.CharField(max_length=15)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=20)
    avatar = models.ImageField(upload_to='user_avatars')
    name = models.CharField(max_length=25)

    def __str__(self):
        return f'{self.login} ({self.name})'