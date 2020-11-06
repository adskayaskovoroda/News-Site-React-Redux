from django import forms
from django.contrib import admin
from django import forms
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Tag, Post
from django.contrib.auth import get_user_model
User = get_user_model()


class UserChangeForm(forms.ModelForm):
    class Meta:
        model = User
        fields = '__all__'

class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserChangeForm

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('username', 'avatar')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password', 'avatar'),
        }),
    )

admin.site.register(User, UserAdmin)
admin.site.register(Tag)
admin.site.register(Post)
