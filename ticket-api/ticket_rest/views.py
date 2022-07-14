import email
import json
from struct import pack_into
from django.http import JsonResponse
from django.shortcuts import render
from .encoders import ConcertVOEncoder, TicketEncoder, UserVOEncoder, TicketDetailEncoder
from django.views.decorators.http import require_http_methods
import requests
from .models import ConcertVO, Ticket, UserVO


#Get request of all concerts
# Will need to go back and edit the page and location of the url in order to show the right
# city and pages
# follow the pagination of the setlist api (20 items per page) - if user clicks next arrow
# on react, add one to the end of page string (or subtract) and use that to show the next
# list of concerts
# keep in mind date being in future
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
# make sure that when we click the page on react to see the concert, a concert
# post request is sent to the concert microservice which should then poll over
# to this microservice as a concertvo option. That concertVO option will automatically
# be selected on the backend when the ticket is being sold
# be sure to leave buyer as null on this request. Put request will update the buyer
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
        try:
            concert = ConcertVO.objects.get(concert_id=content["concert"])
            content["concert"] = concert
        except ConcertVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid concert id"},
                status=400
            )
        try:
            seller = UserVO.objects.get(email=content["seller"])
            content["seller"] = seller
        except UserVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid user email"},
                status=400
            )
        ticket = Ticket.objects.create(**content)
        return JsonResponse(
            ticket,
            encoder = TicketDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET","PUT","DELETE"])
def api_update_tickets(request, pk):
    if request.method == "GET":
        try:
            tickets = Ticket.objects.get(id=pk)
            return JsonResponse(
                tickets,
                encoder=TicketEncoder,
                safe=False
            )
        except Ticket.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            tickets = Ticket.objects.get(id=pk)
            tickets.delete()
            return JsonResponse(
                tickets,
                encoder=TicketEncoder,
                safe=False,
            )
        except Ticket.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    elif request.method == "PUT":
        try:
            tickets = Ticket.objects.get(id=pk)

     
            setattr(tickets, "sold", True)
            #setattr(tickets, "buyer", True)

            tickets.save()
            return JsonResponse(
                tickets,
                encoder=TicketEncoder,
                safe=False,
            )
        except Ticket.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response