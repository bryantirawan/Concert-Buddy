from django.db import models
from django.contrib.auth.models import AbstractUser

class ConcertVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True, null=True)
    venue = models.CharField(max_length=200, null=True)
    city = models.CharField(max_length=100, null=True)
    date = models.DateTimeField(null=True)
    artist = models.CharField(max_length=100, null=True)
    concert_id = models.CharField(max_length=100, null=True)

    def __str__(self):
        return f"Venue: {self.venue}, Artist: {self.artist}, City: {self.city}"

class User(AbstractUser):
    email = models.EmailField(unique=True)
    concert = models.ManyToManyField(ConcertVO)

    def __str__(self):
        return str(self.email)
