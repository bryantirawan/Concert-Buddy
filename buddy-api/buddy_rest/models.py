from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser, UserManager

USER_MODEL = settings.AUTH_USER_MODEL 

class Concert(models.Model):
    venue = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    date = models.DateTimeField(null=True)
    artist = models.CharField(max_length=100)
    concert_id = models.CharField(max_length=100, unique=True)
    venue_id = models.CharField(max_length=100)
    artist_id = models.CharField(max_length=100)
    fellow_user = models.ManyToManyField(USER_MODEL, related_name="concertsgoing")

    def __str__(self):
        return f"Artist: {self.artist}, Venue: {self.venue}, City: {self.city}, Date: {self.date}"

class User(AbstractUser):
    email = models.EmailField(unique=True)
    concert = models.ManyToManyField(Concert)
    objects = UserManager()

    def __str__(self):
        return str(self.email)


    # def save(self):
    #     user = super(User, self)
    #     user.set_password(self.password)
    #     user.save()
    #     return user