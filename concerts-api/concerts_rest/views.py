from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import Concert
from django.http import JsonResponse
from .encoders import ( ConcertEncoder)
import requests

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

def format_date(date):
    proper_date = date.split("-") 
    #proper_date_list = [MM, DD, YEAR] 
    return proper_date[2] + "-" + proper_date[1] + "-" + proper_date[0] 

@require_http_methods(["POST"])
def log_concert(request, concertdict):
    url = 'https://api.setlist.fm/rest/1.0/'
    setlist_path = f'setlist/{concertdict}'
    header = {
    "x-api-key": "1Lw-KTV9OFozLe7JpUeAyOdJHJH9HeVWNn2B",
    "Accept": "application/json"
    } 
    
    setlists = requests.get(f"{url}{setlist_path}", headers=header).json() 
    
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


    
    #Concert_save.user.add(request.user) #assign user to Concert just saved (many to many needs to be created before assigned)
        

    
