from rest_framework import viewsets
from rest_framework.response import Response
from buddy_rest.models import Concert, User
from .serializer import ConcertSerializer, UserSerializer


###

from django.contrib.auth import get_user_model
from rest_framework import generics


class ConcertViewSet(viewsets.ModelViewSet):
    serializer_class = ConcertSerializer

    def get_queryset(self):
        concert = Concert.objects.all()
        return concert

    def create(self, request, *args, **kwargs):
        data = request.data

        try:
            new_concert = Concert.objects.get(concert_id = data["concert_id"]) #check to see if Concert exists already
        except:
            new_concert = Concert(
                venue=data["venue"],
                city=data["city"],
                date=data["date"],
                artist=data["artist"],
                concert_id=data["concert_id"],
                venue_id=data["venue_id"],
                artist_id=data["artist_id"]
                )

        new_concert.save()

        user_object = ''

        try: # POST for buddy
            for user in data["fellow_user"]:
                fellow_user_obj = User.objects.get(id=user["id"])
                user_object = User.objects.get(id=user["id"])
                new_concert.fellow_user.add(fellow_user_obj)
            concert_obj = Concert.objects.get(concert_id=data["concert_id"])
            user_object.concert.add(concert_obj)
        except: #POST for tickets
            pass

        serializer = ConcertSerializer(new_concert)

        return Response(serializer.data)

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        user = User.objects.all()
        return user

    #used for removing concerts from user model and fellow user from concert model at user concert pag
    def update(self, request, *args, **kwargs):
        user_object = self.get_object()

        data = request.data

        concert_obj = Concert.objects.get(concert_id=data["concert"])
        user_object.concert.remove(concert_obj)
        concert_obj.fellow_user.remove(user_object)

        serializer = UserSerializer(user_object)
        return Response(serializer.data)

###
class SignUpView(generics.CreateAPIView):
        queryset = get_user_model().objects.all()
        serializer_class = UserSerializer
    






        
        
