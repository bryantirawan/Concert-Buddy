from django.test import TestCase
from django.contrib.auth import get_user_model
# from rest_framework import status
# from rest_framework.reverse import reverse
# from rest_framework.test import APITestCase
import json

# PASSWORD = 'pAssw0rd!'


# class AuthenticationTest(APITestCase):
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

class ConcertTest(TestCase): 
    def setUp(self):
        self.valid_payload = {
            'venue': 'Muffin',
            'city': 4,
            'date': 'Pamerion',
            'artist': 'White',
            'concert_id': '23',
			'venue_id': '33',
			'artist_id': '33-14b0-4217-8e97-eb41da73f598',
			'fellow_user': [{
				'id': 2
			}]
        }
        self.invalid_payload = {
            'venue': 'Muffin',
            'city': 4,
            'date': 'Pamerion',
            'artist': 'White',
            'concert_id': '',
			'venue_id': '33',
			'artist_id': '33-14b0-4217-8e97-eb41da73f598',
			'fellow_user': [{
				'id': 2
			}]
        } 
    def test_create_valid_concert(self):
        response = self.client.post(
            'http://localhost:8080/buddy/concert/',
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code == 201)
    
    def test_create_invalid_concert(self):
        response = self.client.post(
            'http://localhost:8080/buddy/concert/',
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code == 400)