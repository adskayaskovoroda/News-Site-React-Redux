from django.db import models

from .tag import Tag
from .user import User

class News(models.Model):
    title = models.CharField(max_length=50)
    image = models.CharField(max_length=250)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag)
