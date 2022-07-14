import json
from struct import pack_into
from django.http import JsonResponse
from django.shortcuts import render
from .encoders import ConcertVOEncoder, TicketEncoder, UserVOEncoder, TicketDetailEncoder
from django.views.decorators.http import require_http_methods
import requests
from .models import ConcertVO, Ticket


#Get request of all concerts
# Will need to go back and edit the page and location of the url in order to show the right
# city and pages
# follow the pagination of the setlist api (20 items per page) - if user clicks next arrow
# on react, add one to the end of page string (or subtract) and use that to show the next
# list of concerts
@require_http_methods(["GET"])
def api_list_concerts(request):
    page = '&p=1'
    location = 'San%20Francisco'
    url = 'https://api.setlist.fm/rest/1.0/search/setlists?cityName='+ location + page
    # url = 'https://api.setlist.fm/rest/1.0/search/setlists?cityName=San%20Francisco&p=1'
    headers = {
        "x-api-key": "1Lw-KTV9OFozLe7JpUeAyOdJHJH9HeVWNn2B",
        "Accept": "application/json"}

    concerts = requests.get(url, headers=headers).json()

    return JsonResponse(
        {"concerts": concerts}
    )

#Get a specific concert
# will change the id to make dynamic after. Will utilize calling concerts.setlist[0].id on the page
# click in order to generate the correct concert information on the page
@require_http_methods(["GET"])
def api_get_concert_by_location(request, pk):
    id = '3bb2b4ec'
    url = 'https://api.setlist.fm/rest/1.0/setlist/'+ id
    headers = {
        "x-api-key": "1Lw-KTV9OFozLe7JpUeAyOdJHJH9HeVWNn2B",
        "Accept": "application/json"}
    concert = requests.get(url, headers=headers).json()

    return JsonResponse(
        {"concert": concert}
    )

#list concerts by artist for the seller to list tickets
#hard coded for now but will edit on the front end to pass through as a parameter
# also will think about consolidating this code to use as a function instead of repeating
@require_http_methods(["GET"])
def api_get_concert_by_artist(request, pk):
    artist_name = 'The%20Mother%20Hips'
    url = 'https://api.setlist.fm/rest/1.0/search/artists?artistName='+ artist_name
    headers = {
        "x-api-key": "1Lw-KTV9OFozLe7JpUeAyOdJHJH9HeVWNn2B",
        "Accept": "application/json"}
    concert = requests.get(url, headers=headers).json()

    return JsonResponse(
        {"concert": concert}
    )

# will have to add more to this part
# i think ConcertVO part might have to be an API call?
# since we are not saving all ConcertVO instances ...
# how will a seller be able to choose a concert from ConcertVO when
# we are not saving them? Api likely
@require_http_methods(["GET", "POST"])
def api_get_tickets(request):
    if request.method == "GET":
        tickets = Ticket.objects.all()
        return JsonResponse(
            {"tickets": tickets},
            encoder=TicketEncoder,
            )
    else:
        content = json.loads(request.body)




        ticket = Ticket.objects.create(**content)
        return JsonResponse(
            ticket,
            encoder = TicketDetailEncoder,
            safe=False,
        )
