from rest_framework.serializers import ModelSerializer 
from .models import ConcertVO, User 

class UserSerializer(ModelSerializer): 
    class Meta:
        model = User
        fields = 'concert'

