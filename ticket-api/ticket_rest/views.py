import email
from email.headerregistry import Address
import json
from struct import pack_into
from django.http import JsonResponse
from django.shortcuts import render
from .encoders import AddressEncoder, ConcertVOEncoder, OrderItemEncoder, TicketEncoder, UserVOEncoder, TicketDetailEncoder
from django.views.decorators.http import require_http_methods
import requests
from .models import Address, ConcertVO, OrderItem, Ticket, UserVO
#from concerts_rest.models import Concert



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
        print(content)
        try:
            concert = ConcertVO.objects.get(concert_id=content["concert"])
            content["concert"] = concert
        except ConcertVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid concert id"},
                status=400
            )
        try:
            seller = UserVO.objects.get(id=content["seller"])
            content["seller"] = seller
        except UserVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid user id"},
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


@require_http_methods(["GET"])
def api_tickets_by_concert(request):
    if request.method == "GET":
        try:
            tickets = Ticket.objects.all()

            return JsonResponse(
                tickets,
                encoder=TicketEncoder,
                safe=False
            )
        except Ticket.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_get_orderitems(request):
    if request.method == "GET":
        order_item = OrderItem.objects.all()
        return JsonResponse(
            {"order_item": order_item},
            encoder=OrderItemEncoder,
            )
    else:
        content = json.loads(request.body)
        print(content)
        try:
            ticket = Ticket.objects.get(id=content["ticket"])
            content["ticket"] = ticket
            setattr(ticket, "sold", True)
            new_user = UserVO.objects.get(id=content["user"])
            # content["user"] = new_user
            setattr(ticket, "buyer", new_user)
            ticket.save()
        except Ticket.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid concert id"},
                status=400
            )
        try:
            user = UserVO.objects.get(id=content["user"])
            content["user"] = user
        except UserVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid user id"},
                status=400
            )
        try:
            shipping_address = Address.objects.get(user=content["shipping_address"])
            content["shipping_address"] = shipping_address
        except Address.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Address User"},
                status=400
            )
        order_item = OrderItem.objects.create(**content)

        return JsonResponse(
            order_item,
            encoder = OrderItemEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def api_get_addresses(request):
    if request.method == "GET":
        address = Address.objects.all()
        return JsonResponse(
            {"address": address},
            encoder=AddressEncoder,
            )
    else:
        content = json.loads(request.body)
        print(content)
        try:
            user = UserVO.objects.get(id=content["user"])
            content["user"] = user
        except UserVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid user id"},
                status=400
            )
        address = Address.objects.create(**content)
        return JsonResponse(
            address,
            encoder = AddressEncoder,
            safe=False,
        )
