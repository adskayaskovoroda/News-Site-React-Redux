from rest_framework import routers

from .views import NewsViewSet

router = routers.SimpleRouter()
router.register(r'', NewsViewSet)

urlpatterns = router.urls