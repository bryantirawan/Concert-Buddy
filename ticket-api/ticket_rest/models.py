from email.errors import BoundaryError
from django.db import models
from django.shortcuts import reverse
from django_countries.fields import CountryField



ADDRESS_CHOICES = (
    ('B', 'Billing'),
    ('S', 'Shipping'),
)


class ConcertVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    venue = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    date = models.DateTimeField()
    artist = models.CharField(max_length=100)
    concert_id = models.CharField(max_length=100)

    def __str__(self):
        return f"Venue: {self.venue}, Artist: {self.artist}, City: {self.city}"


class UserVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=200, null=True)
    last_name = models.CharField(max_length=200, null=True)

    def __str__(self):
        return str(self.email)


class Ticket(models.Model):
    price = models.DecimalField(max_digits=6, decimal_places=2)
    section = models.CharField(max_length=20)
    row = models.CharField(max_length=20)
    seat = models.CharField(max_length=20)
    sold = models.BooleanField(default=False)
    picture_url = models.URLField()
    concert = models.ForeignKey(ConcertVO,
        related_name="concert_tickets",
        on_delete=models.PROTECT)
    seller = models.ForeignKey(UserVO,
        related_name="seller_tickets",
        on_delete=models.PROTECT)
    buyer = models.ForeignKey(UserVO,
        related_name="buyer_tickets", null=True,
        on_delete=models.PROTECT)

    def __str__(self):
        return f"{self.concert}, Sold by {self.seller} for ${self.price}"

