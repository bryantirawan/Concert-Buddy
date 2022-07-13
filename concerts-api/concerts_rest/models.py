from django.db import models



class Concert(models.Model):
    name = models.CharField(max_length=200)
    venue = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    date = models.DateTimeField(null=True)
    artist = models.CharField(max_length=100)
    concert_id = models.CharField(max_length=100)
    venue_id = models.CharField(max_length=100)
    artist_id = models.CharField(max_length=100)
