# from django.test import TestCase, Client
# from django_fake_model import models as f
# from django.db import models
# # from ..models import ConcertVO, UserVO
# import json
# import datetime


# class FakeConcertVOModel(f.FakeModel):
#     import_href = models.CharField(max_length=200, unique=True)
#     venue = models.CharField(max_length=200)
#     city = models.CharField(max_length=100)
#     date = models.DateTimeField()
#     artist = models.CharField(max_length=100)
#     concert_id = models.CharField(max_length=100)


# class ApiTicketsTests(TestCase):
#     @classmethod
#     def setUp(self):
#         self.client = Client()

#     def test_get_tickets(self):
#         response = self.client.get("/api/tickets/")
#         content = json.loads(response.content)
#         self.assertEqual(response.status_code, 200)
#         self.assertIn("tickets", content)

    # @FakeConcertVOModel.fake_me
    # def test_post_tickets(self):
    #     FakeConcertVOModel.objects.create(
    #         artist="test_artist",
    #         city="test_city",
    #         concert_id="53b3eb72",
    #         date=datetime.date.today(),
    #         venue="test_venue",
    #         )
    #     model = FakeConcertVOModel.objects.get(artist="test_artist")
    #     self.assertEqual(model.artist, "test_artist")

    #     ConcertVO.objects.create(
    #         artist="test_artist",
    #         city="test_city",
    #         concert_id="53b3eb74",
    #         date=datetime.date.today(),
    #         venue="test_venue",
    #         )

    #     UserVO.objects.create(
    #         first_name="test_first",
    #         last_name="test_last",
    #         email="test@test.com"
    #         )

    #     ticket = json.dumps({
    #         "price": 200,
    #         "section": "A24",
    #         "row": "17",
    #         "seat": "22",
    #         "picture_url": "ticket.jpeg",
    #         "concert": "53b3eb74",
    #         "seller": 1,
    #         "buyer": None
    #     })
    #     response = self.client.post("/api/tickets/", ticket, "application/json")
    #     content = json.loads(response.content)
    #     self.assertEqual(response.status_code, 200)
    #     self.assertIn("price", content)
    #     self.assertIn("section", content)
    #     self.assertIn("row", content)
    #     self.assertIn("seat", content)
    #     self.assertIn("picture_url", content)
    #     self.assertIn("concert", content)
    #     self.assertIn("seller", content)
    #     self.assertIn("buyer", content)
