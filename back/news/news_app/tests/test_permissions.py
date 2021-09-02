from rest_framework.test import APITestCase, APIRequestFactory
from ..models import User
from ..permissions import IsPostOrIsAuthenticated


class IsPostOrIsAuthenticatedTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.factory = APIRequestFactory()
        cls.permission = IsPostOrIsAuthenticated()

    def setUp(self) -> None:
        self.user = User.objects.create(email='test_user@mail.com')

    def authenticate(self, request):
        request.user = self.user

    def test_post(self):
        request = self.factory.post('/posts/')
        self.assertTrue(self.permission.has_permission(request))

        self.authenticate(request)
        self.assertTrue(self.permission.has_permission(request))

    def test_not_post(self):
        request = self.factory.get('/posts/')
        self.assertFalse(self.permission.has_permission(request))

        self.authenticate(request)
        self.assertTrue(self.permission.has_permission(request))
