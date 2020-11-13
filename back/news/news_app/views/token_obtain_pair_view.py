from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.exceptions import ObjectDoesNotExist
from ..serializers import CustomTokenObtainPairSerializer

from ..models import User


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        if 'isGoogle' in request.data:
            del request.data['isGoogle']
            try:
                User.objects.get(email=request.data['email'])
            except User.DoesNotExist:
                User.objects.create_user(**request.data)

        return super().post(request, args, kwargs)