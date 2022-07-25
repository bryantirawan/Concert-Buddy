from rest_framework import serializers
from buddy_rest.models import Concert, User

class ConcertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concert 
        fields = ['id', 'venue', 'city', 'date', 'artist', 'concert_id', 'venue_id', 'artist_id','fellow_user']
        depth = 1 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['id', 'username', 'email', 'concert']
        depth = 2
