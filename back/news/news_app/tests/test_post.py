from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from ..models import User, Post, Tag


class PostTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.client = APIClient()
        cls.post_url = '/posts/'

    def setUp(self) -> None:
        self.user = User.objects.create(
            email='test_user@test.test',
        )

    def authenticate(self, user: User = None):
        self.client.force_authenticate(user or self.user)

    def test_create_valid_post(self):
        self.authenticate()

        data = {
            'title': 'test_title',
            'content': 'test_content',
        }

        response = self.client.post(self.post_url, data)
        assert response.status_code == status.HTTP_201_CREATED

        post = Post.objects.get(pk=response.data['id'])

        assert post.title == data['title']
        assert post.content == data['content']
        assert post.image == ''
        assert post.author == self.user
        assert not post.tags.exists()

    def test_create_invalid_post(self):
        self.authenticate()

        response = self.client.post(self.post_url)
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_create_post_with_tags(self):
        self.authenticate()

        data = {
            'title': 'test_title',
            'content': 'test_content',
            'tags': ['tag_a', 'tag_b']
        }

        response = self.client.post(self.post_url, data)
        assert response.status_code == status.HTTP_201_CREATED

        post = Post.objects.get(pk=response.data['id'])

        assert list(map(str, post.tags.all())) == data['tags']

    def test_unauthorized_create_post(self):
        data = {
            'title': 'test_title',
            'content': 'test_content'
        }

        response = self.client.post(self.post_url, data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_create_posts_with_intersected_tags(self):
        self.authenticate()

        data_a = {
            'title': 'test_title_a',
            'content': 'test_content_a',
            'tags': ['tag_a', 'tag_b']
        }

        response = self.client.post(self.post_url, data_a)
        assert response.status_code == status.HTTP_201_CREATED

        data_b = {
            'title': 'test_title_b',
            'content': 'test_content_b',
            'tags': ['tag_b', 'tag_c']
        }

        response = self.client.post(self.post_url, data_b)
        assert response.status_code == status.HTTP_201_CREATED

        assert len(Tag.objects.all()) == 3
