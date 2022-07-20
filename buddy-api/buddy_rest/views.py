import json
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from rest_framework.response import Response 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .encoders import ( ConcertEncoder, UserEncoder )
from .models import User
import requests

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
        {   'user': one_user.id,
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
    url = 'https://api.setlist.fm/rest/1.0/search/setlists?cityName='
    headers = {
        "x-api-key": "1Lw-KTV9OFozLe7JpUeAyOdJHJH9HeVWNn2B",
        "Accept": "application/json"}
        
    concerts = requests.get(f'{url}{location}{page}', headers=headers).json()

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
    concerts = requests.get(url, headers=headers).json()

    return JsonResponse(
        {"concerts": concerts}
    )





