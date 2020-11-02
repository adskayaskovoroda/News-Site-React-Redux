from django.db import models

from .tag import Tag
from .user import User

class News(models.Model):
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='post_images')
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag)

    def __str__(self):
        return self.title