import json
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .encoders import ( ConcertEncoder, UserEncoder )
from .models import Concert, User
import requests

#used for poller
@require_http_methods(["GET", "POST"])
def api_users(request):
    print("HEY")
    if request.method == "GET":
        users = User.objects.all()
        print("HELP")
        return JsonResponse(
            print("RETURN STATEMENT"),
            {"users": users},
            encoder=UserEncoder,
        )
    else:
        return "Create POST REQUEST VIEW"

def format_date(date):
    proper_date = date.split("-")
    return proper_date[2] + "-" + proper_date[1] + "-" + proper_date[0]

#used for concerts im attending page
@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def api_get_user_concerts_withoutpk(request):
    one_user = request.user
    user_concerts = one_user.concert.all()
    return JsonResponse(
        {
            'concerts': user_concerts,
        },
        encoder=ConcertEncoder
        )

#used for fellow users going to concert
@require_http_methods(["GET"])
def api_get_fellow_concert_users(request, pk):
    one_concert = Concert.objects.get(concert_id=pk)
    fellow_users = one_concert.fellow_user.values()
    return JsonResponse(
        {
            'users': list(fellow_users),
        }
    )

#used for concert detail page
@require_http_methods(["GET", "PUT"])
def api_concert(request, pk):
    if request.method == "GET":
        concert = Concert.objects.get(concert_id=pk)
        return JsonResponse(
            concert,
            encoder=ConcertEncoder,
            safe=False,
        )
    else: #PUT
        try:
            content = json.loads(request.body)
            model = Concert.objects.get(id=pk)
            props = ["fellow_user"]
            for prop in props:
                if prop in content:
                    setattr(model, prop, content[prop])
            model.save()
            return JsonResponse(
                model,
                encoder=ConcertEncoder,
                safe=False,
            )
        except Concert.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


#used for poller
@require_http_methods(["GET", "POST"])
def api_concerts(request):
    if request.method == "GET":
        concerts = Concert.objects.all()
        return JsonResponse(
            {"concerts": concerts},
            encoder=ConcertEncoder,
        )
    else: #POST
        try:
            content = json.loads(request.body)
            concert = Concert.objects.create(**content)
            return JsonResponse(
                concert,
                #encoder=ConcertEncoder, #need to figure out how to do this without encoders
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the concert"}
            )
            response.status_code = 400
            return response

#used for search
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

#used for search
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

#used for 1st half of logic of im going button in conjunction with viewset logic
@require_http_methods(["GET"])
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
    concertdict['venue_id'] = setlists['venue']['id']
    concertdict['artist_id'] = setlists['artist']['mbid']
    concertdict['city'] = setlists['venue']['city']['name']
    concertdict['date'] = format_date(setlists['eventDate'])
    concertdict['artist'] = setlists['artist']['name']
    concertdict['concert_id'] = setlists['id']

    print('concertdict from log_concert', concertdict)
    return JsonResponse(concertdict)


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
