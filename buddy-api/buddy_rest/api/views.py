from rest_framework import viewsets
from rest_framework.response import Response 
from buddy_rest.models import Concert, User 
from .serializer import ConcertSerializer, UserSerializer

class ConcertViewSet(viewsets.ModelViewSet): 
    serializer_class = ConcertSerializer 

    def get_queryset(self):
        concert = Concert.objects.all()
        return concert 

class UserViewSet(viewsets.ModelViewSet): 
    serializer_class = UserSerializer 

    def get_queryset(self):
        user = User.objects.all()
        return user 
    