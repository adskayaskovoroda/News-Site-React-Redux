from rest_framework import permissions


class IsPostOrIsAuthenticated(permissions.BasePermission):        
    def has_permission(self, request, view=None):
        if request.method == 'POST':
            return True
        return hasattr(request, 'user') and request.user and request.user.is_authenticated
