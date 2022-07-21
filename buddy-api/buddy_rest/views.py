import json
from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from rest_framework.response import Response 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .encoders import ( UserEncoder, ConcertEncoder)
from .models import User, Concert
import requests


def format_date(date):
    proper_date = date.split("-") 
    #proper_date_list = [MM, DD, YEAR] 
    return proper_date[2] + "-" + proper_date[1] + "-" + proper_date[0] 


@api_view(["GET"])
#@permission_classes([IsAuthenticated])
def api_get_user_concerts(request, pk):
    one_user = User.objects.get(id=pk) 
    user_concerts = one_user.concert.all()
    return JsonResponse(
        {   'user': one_user.id,
            'concerts': user_concerts,
        },
        encoder=ConcertEncoder
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def api_get_user_concerts_withoutpk(request):
    one_user = request.user
    user_concerts = one_user.concert.all()
    return JsonResponse(
        {   
            # 'user': one_user.id,
            'concerts': user_concerts,
        },
        encoder=ConcertEncoder
        )


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@require_http_methods(["GET", "POST"])
def api_users(request):
    if request.method == "GET":
        users = User.objects.all()
        return JsonResponse(
            {"users": users},
            encoder=UserEncoder,
        )
    else:
        return "Create POST REQUEST VIEW"

@require_http_methods(["GET", "POST"])
def api_concerts(request):
    if request.method == "GET":
        concerts = Concert.objects.all()
        return JsonResponse(
            {"concerts": concerts},
            encoder=ConcertEncoder,
        )
    else:
        return "Create POST REQUEST VIEW"

@require_http_methods(["GET"])
def api_concert(request, pk):
    concert = Concert.objects.get(concert_id=pk)
    return JsonResponse(
        concert,
        encoder=ConcertEncoder,
        safe=False,
    )

@require_http_methods(["GET"])
def api_select_concert(request):
    url = 'https://api.setlist.fm/rest/1.0/search/setlists?cityName=San%20Francisco&p=1'
    headers = {
        "x-api-key": "1Lw-KTV9OFozLe7JpUeAyOdJHJH9HeVWNn2B",
        "Accept": "application/json"}

    r = requests.get(url, headers=headers).json()
    return JsonResponse(
        r
    )

@require_http_methods(["GET"])
def api_select_concert_for_city(request, location, page):
    url = 'https://api.setlist.fm/rest/1.0/search/setlists?cityName='+ location + page
    headers = {
        "x-api-key": "1Lw-KTV9OFozLe7JpUeAyOdJHJH9HeVWNn2B",
        "Accept": "application/json"}
    try:
        concerts = requests.get(url, headers=headers).json()
    except:
        return JsonResponse(
            {"message": "invalid search request"},
            status=400
        )
    return JsonResponse(
            {"concerts": concerts}
        )

@require_http_methods(["GET"])
def api_get_concert_by_artist(request, pk):
    # artist_name = 'The%20Mother%20Hips'
    url = 'https://api.setlist.fm/rest/1.0/search/setlists?artistName='+ pk
    headers = {
        "x-api-key": "1Lw-KTV9OFozLe7JpUeAyOdJHJH9HeVWNn2B",
        "Accept": "application/json"}
    try:
        concerts = requests.get(url, headers=headers).json()
    except:
        return JsonResponse(
            {"message": "invalid search request"},
            status=400
        )
    return JsonResponse(
            {"concerts": concerts}
        )


@require_http_methods(["POST"])
def log_concert(request, concertdict):
    url = 'https://api.setlist.fm/rest/1.0/'
    setlist_path = f'setlist/{concertdict}'
    header = {
    "x-api-key": "1Lw-KTV9OFozLe7JpUeAyOdJHJH9HeVWNn2B",
    "Accept": "application/json"
    } 
    
    setlists = requests.get(f"{url}{setlist_path}", headers=header).json() 
    print('setlist trying to be saved', setlists)
    concertdict = {} 
    concertdict['venue'] = setlists['venue']['name']
    concertdict['city'] = setlists['venue']['city']['name']
    concertdict['eventDate'] = format_date(setlists['eventDate'])
    concertdict['artist'] = setlists['artist']['name']
    concertdict['id'] = setlists['id'] 
    concertdict['venueID'] = setlists['venue']['id']
    concertdict['artistID'] = setlists['artist']['mbid']

    try: 
        Concert_save = Concert.objects.get(concert_id = concertdict['id']) #check to see if Concert exists already 
    except: 
        Concert_save = Concert(
            venue=concertdict['venue'], 
            city=concertdict['city'], 
            date=concertdict['eventDate'], 
            artist=concertdict['artist'],
            concert_id=concertdict['id'], 
            venue_id=concertdict['venueID'],
            artist_id=concertdict['artistID'], 
            )
        
    Concert_save.save() #save instance to Concert model 
    return redirect('http://localhost:3000/concertdetail/'+concertdict['id'])

    
    #Concert_save.user.add(request.user) #assign user to Concert just saved (many to many needs to be created before assigned)


