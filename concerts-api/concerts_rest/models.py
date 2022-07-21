from django.db import models
from django.urls import reverse


class Concert(models.Model):
    venue = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    date = models.DateTimeField(null=True)
    artist = models.CharField(max_length=100)
    concert_id = models.CharField(max_length=100, unique=True)
    venue_id = models.CharField(max_length=100)
    artist_id = models.CharField(max_length=100)

    def __str__(self):
        return f"Artist: {self.artist}, Venue: {self.venue}, City: {self.city}, Date: {self.date}"

    def get_api_url(self):
        print("red")
        return reverse("api_concert", kwargs={"pk": self.pk})

