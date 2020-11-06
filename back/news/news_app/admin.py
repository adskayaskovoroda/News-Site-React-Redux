from django.contrib import admin
from django import forms
from django.contrib.auth.admin import UserAdmin
from .models import User, Tag, Post

admin.site.register(User, UserAdmin)
admin.site.register(Tag)
admin.site.register(Post)
