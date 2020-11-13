from django.conf.urls import url, include
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    PostViewSet,
    UserViewSet,
    CustomTokenObtainPairView,
)


router = SimpleRouter()
router.register('posts', PostViewSet)
router.register('users', UserViewSet)

urlpatterns = [
    url('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    url('auth/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    url('', include(router.urls)),
]
