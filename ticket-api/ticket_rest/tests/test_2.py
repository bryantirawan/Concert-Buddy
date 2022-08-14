from django.test import TestCase, Client
import json


class ApiTicketsTests(TestCase):
    @classmethod
    def setUp(self):
        self.client = Client()

    def test_get_tickets(self):
        response = self.client.get("/api/tickets/")
        content = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertIn("tickets", content)
