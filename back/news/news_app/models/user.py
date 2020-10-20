from django.db import models

class User(models.Model):
    login = models.CharField(max_length=15)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=20)
    avatar = models.CharField(max_length=250)
    name = models.CharField(max_length=25)
