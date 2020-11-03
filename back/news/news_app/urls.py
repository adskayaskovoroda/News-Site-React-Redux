from rest_framework import routers
from django.conf.urls import url

from .views import NewsViewSet, UserViewset, CreateUserView, authenticate_user

router = routers.SimpleRouter()
router.register(r'', NewsViewSet)
router.register(r'users', UserViewset)

urlpatterns = [
    url(r'^registration/', CreateUserView.as_view()),
    url(r'^get-token/', authenticate_user)
]

urlpatterns += router.urls