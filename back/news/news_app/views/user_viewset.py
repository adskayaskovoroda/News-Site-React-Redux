from rest_framework import viewsets, mixins
from ..serializers import UserSerializer
from ..models import User
from ..permissions import IsPostOrIsAuthenticated


class UserViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsPostOrIsAuthenticated,)
