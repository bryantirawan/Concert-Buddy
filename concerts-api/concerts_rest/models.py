from django.db import models


class Concert(models.Model):
    name = models.CharField(max_length=200)
    venue = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    date = models.DateTimeField(null=True)
    artist = models.CharField(max_length=100)
    concert_id = models.CharField(max_length=100, unique=True)
    venue_id = models.CharField(max_length=100)
    artist_id = models.CharField(max_length=100)

    def __str__(self):
        return f"Concert: {self.name}, Venue: {self.venue}, City: {self.city}"
