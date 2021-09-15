from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    PostViewSet,
    UserViewSet,
    CustomTokenObtainPairView,
    LoginGoogleUserView,
    GetMeView,
)


router = SimpleRouter()
router.register('posts', PostViewSet)
router.register('users', UserViewSet)

urlpatterns = [
    path('auth/google/', LoginGoogleUserView.as_view(), name='social_auth_google'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('me/', GetMeView.as_view(), name='get_me'),
    path('', include(router.urls)),
]
