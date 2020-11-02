from django.db import models

class Tag(models.Model):
    title = models.CharField(max_length=25, unique=True)

    def __str__(self):
        return self.title