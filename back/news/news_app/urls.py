from django.conf.urls import url, include
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import PostViewSet


router = SimpleRouter()
router.register('posts', PostViewSet)

urlpatterns = [
    url('auth/google/', include('google_auth.urls')),
    url('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    url('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    url('', include(router.urls)),
]
