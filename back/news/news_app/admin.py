from django.contrib import admin
from .models import Tag, User, News


admin.site.register(Tag)
admin.site.register(User)
admin.site.register(News)