from email.headerregistry import Address
import json
from django.http import JsonResponse
from .encoders import AddressEncoder, OrderItemEncoder, TicketEncoder, TicketDetailEncoder
from django.views.decorators.http import require_http_methods
from .models import Address, ConcertVO, OrderItem, Ticket, UserVO


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


@require_http_methods(["PUT"])
def api_change_sold_ticket(request, pk):
    try:
        tickets = Ticket.objects.get(id=pk)
        setattr(tickets, "sold", False)
        setattr(tickets, "buyer", None)
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


@require_http_methods(["GET", "POST"])
def api_get_orderitems(request):
    if request.method == "GET":
        order_item = OrderItem.objects.all()
        return JsonResponse(
            {"order_item": order_item},
            encoder=OrderItemEncoder,
            )
    else: #POST order item
        content = json.loads(request.body)
        print(content)
        ticket = Ticket.objects.get(id=content["ticket"])
        if ticket.sold == True:
            return JsonResponse(
            {"message": "Ticket Already Sold"},
            status=400
            )
        else:
            #assigning ticket to OrderItem and changing sold = True
            try:
                ticket = Ticket.objects.get(id=content["ticket"])
                content["ticket"] = ticket
                setattr(ticket, "sold", True)
                new_user = UserVO.objects.get(id=content["user"])
                setattr(ticket, "buyer", new_user)
                ticket.save()
            except Ticket.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid concert id"},
                    status=400
                )
            #assigning user for OrderItem
            try:
                user = UserVO.objects.get(id=content["user"])
                content["user"] = user
            except UserVO.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid user id"},
                    status=400
                )
            #assigning address for order item for OrderItem
            try:
                try: #possibly existing shipping address and updates existing address whether it needs it or not
                    address_for_order_item = Address.objects.get(user=content["address_for_order_item"])
                    setattr(address_for_order_item, "user", content["user"])
                    setattr(address_for_order_item, "street_address", content["street_address"])
                    setattr(address_for_order_item, "apartment_address", content["apartment_address"])
                    setattr(address_for_order_item, "city", content["city"])
                    setattr(address_for_order_item, "country", content["country"])
                    setattr(address_for_order_item, "zip", content["zip"])
                except: #no existing shipping address
                    Address.objects.update_or_create(
                        user=content["user"],
                        street_address=content["street_address"],
                        apartment_address=content["apartment_address"],
                        city=content["city"],
                        country=content["country"],
                        zip=content["zip"]
                    )
                    address_for_order_item = Address.objects.get(user=content["address_for_order_item"])
                content["address_for_order_item"] = address_for_order_item
            except Address.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid Address User"},
                    status=400
                )

            order_item = OrderItem.objects.create(
                user=content["user"],
                ticket=content["ticket"],
                address_for_order_item=content["address_for_order_item"],
                buyer_venmo=content["buyer_venmo"]
            )
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
