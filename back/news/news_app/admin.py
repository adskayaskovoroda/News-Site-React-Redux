from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Tag, Post, User


class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('username', 'avatar')}),
        ('Admin info', {'fields': ('is_staff', 'is_superuser')})
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password'),
        }),
        ('Personal info', {
            'fields': ('username', 'avatar')
        })
    )


admin.site.register(User, UserAdmin)
admin.site.register(Tag)
admin.site.register(Post)
