from rest_framework import viewsets, status
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist

from ..permissions import IsPostOrIsAuthenticated
from ..serializers import UserSerializer
from ..models import User


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsPostOrIsAuthenticated]

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        User.objects.create_user(**request.data)
        headers = self.get_success_headers(serializer.data)
        return Response({'success': 'OK'}, status=status.HTTP_201_CREATED, headers=headers)

    def partial_update(self, request, pk=None):
        user = User.objects.get(pk=pk)
        if 'email' in request.data:
            if self.user_with_email_exists(request.data['email'], pk):
                return Response({
                    'error': 'User with same email already exists.'
                }, status=status.HTTP_406_NOT_ACCEPTABLE)
            user.email = request.data['email']
        if 'password' in request.data:
            user.set_password(request.data['password'])
        if 'full_name' in request.data:
            user.full_name = request.data['full_name']
        if 'avatar' in request.data:
            user.avatar = request.data['avatar']
        user.save()
        return Response({'success': 'OK'}, status=status.HTTP_202_ACCEPTED)

    def user_with_email_exists(self, email, pk=-1):
        try:
            user = User.objects.get(email=email)
            if user.id == pk:
                return True
            return False
        except User.DoesNotExist:
            return False
