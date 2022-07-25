from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser, UserManager

USER_MODEL = settings.AUTH_USER_MODEL 

class Concert(models.Model):
    venue = models.CharField(max_length=200, null=True)
    city = models.CharField(max_length=100, null=True)
    date = models.DateTimeField(null=True)
    artist = models.CharField(max_length=100, null=True)
    concert_id = models.CharField(max_length=100, unique=True)
    venue_id = models.CharField(max_length=100, null=True)
    artist_id = models.CharField(max_length=100, null=True)
    fellow_user = models.ManyToManyField(USER_MODEL, related_name="concertsgoing", blank=True)

    def __str__(self):
        return f"Artist: {self.artist}, Venue: {self.venue}, City: {self.city}, Date: {self.date}"

class User(AbstractUser):
    email = models.EmailField(unique=True, null=True)
    concert = models.ManyToManyField(Concert, blank=True)

    def __str__(self):
        return str(self.email)
