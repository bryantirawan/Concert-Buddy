# from django.db import connections
# from django.contrib.auth import get_user_model
from django.test import SimpleTestCase
from django.urls import reverse, resolve
from buddy_rest.views import (
    api_concerts,
    api_get_user_concerts_withoutpk,
)
# from rest_framework import status
# from rest_framework.reverse import reverse


# python manage.py test buddy_rest
class TestUrls(SimpleTestCase):
    def test_concerts_url_resolves(self):
        url = reverse("api_concerts")
        self.assertEquals(resolve(url).func, api_concerts)

    def test_getconcerts_url_resolves(self):
        url = reverse("api_get_user_concert_list_withoutpk")
        self.assertEquals(resolve(url).func, api_get_user_concerts_withoutpk)


# PASSWORD = 'pAssw0rd!'


# class AuthenticationTest(TestCase):
#     def test_user_can_sign_up(self):
#         response = self.client.post(reverse('sign_up'), data={
#             'username': 'user@example.com',
#             'first_name': 'Test',
#             'last_name': 'User',
#             'password1': PASSWORD,
#             'password2': PASSWORD,
#         })
#         user = get_user_model().objects.last()
#         self.assertEqual(status.HTTP_201_CREATED, response.status_code)
#         self.assertEqual(response.data['id'], user.id)
#         self.assertEqual(response.data['username'], user.username)
#         self.assertEqual(response.data['first_name'], user.first_name)
#         self.assertEqual(response.data['last_name'], user.last_name)
