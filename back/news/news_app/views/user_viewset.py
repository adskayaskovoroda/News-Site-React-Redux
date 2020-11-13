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
        if self.user_with_email_exists(request.data['email']):
            return Response({
                'detail': 'User with the same email already exists.'
                }, status=status.HTTP_400_BAD_REQUEST)
        User.objects.create_user(**request.data)
        return Response({'success': 'OK'}, status=status.HTTP_201_CREATED)

    def partial_update(self, request, pk=None):
        user = User.objects.get(pk=pk)
        if 'email' in request.data:
            if self.user_with_email_exists(request.data['email'], pk):
                return Response({
                    'detail': 'User with same email already exists.'
                }, status=status.HTTP_400_BAD_REQUEST)
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
                return False
            return True
        except User.DoesNotExist:
            return False
