from django.db import models
from django.contrib.auth.models import AbstractUser

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

class User(AbstractUser):
    email = models.EmailField(unique=True)
    concert = models.ManyToManyField(Concert)

    def __str__(self):
        return str(self.email)
