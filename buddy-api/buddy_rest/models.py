from django.db import models
from django.contrib.auth.models import AbstractUser

class ConcertVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=200)
    venue = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    date = models.DateTimeField()
    artist = models.CharField(max_length=100)
    concert_id = models.CharField(max_length=100)


class User(AbstractUser):
    email = models.EmailField(unique=True)
    concert = models.ManyToManyField(ConcertVO)


