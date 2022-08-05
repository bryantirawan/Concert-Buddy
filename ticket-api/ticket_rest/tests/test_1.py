from django.test import SimpleTestCase
from django.urls import reverse, resolve
from ticket_rest.views import api_get_orderitems, api_get_addresses


# python manage.py test ticket_rest
class TestUrls(SimpleTestCase):
    def test_orderitem_url_resolves(self):
        url = reverse("api_get_orderitems")
        self.assertEquals(resolve(url).func, api_get_orderitems)

    def test_addresses_url_resolves(self):
        url = reverse("api_get_addresses")
        self.assertEquals(resolve(url).func, api_get_addresses)
