from django.db import models
from django.conf import settings
from .tag import Tag


class Post(models.Model):
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='post_images', null=True, blank=True)
    content = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return self.title
