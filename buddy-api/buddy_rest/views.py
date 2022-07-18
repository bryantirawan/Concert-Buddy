import json
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse

from .encoders import ( UserEncoder,)
from .models import User
import requests

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





