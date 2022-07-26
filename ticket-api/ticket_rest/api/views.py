# from rest_framework import viewsets
# from rest_framework.response import Response
# from .serializers import ConcertSerializer, UserSerializer, TicketSerializer, OrderItemSerializer, OrderSerializer, AddressSerializer
# from ticket_rest.models import (ConcertVO, UserVO, Address,
#                                     Ticket, OrderItem, Order)

# class OrderViewSet(viewsets.ModelViewSet):
#     serializer_class = OrderSerializer

#     def get_queryset(self):
#         order = Order.objects.all()
#         return order

#     def create(self, request, *args, **kwargs):
#         data = request.data

#         new_order = Order(
#             order_date=data["order_date"],
#             shipping_address=data["shipping_address"],
#             billing_address=data["billing_address"],
#             buyer_venmo=data["buyer_venmo"],
#             )

#         new_order.save()
#         for ticket in data["tickets"]:
#             ticket_obj = Ticket.objects.get(id=ticket["id"])
#             new_order.tickets.add(ticket_obj)

#         serializer = OrderSerializer(new_order)

#         return Response(serializer.data)

# # class TicketViewSet(viewsets.ModelViewSet):
# #     serializer_class = TicketSerializer
# #     #GET
# #     def get_queryset(self):
# #         ticket = Ticket.objects.all()
# #         return ticket
# #     #PUT
# #     def update(self, request, *args, **kwargs):
# #         ticket_object = self.get_object()

# #         data = request.data
# #         new_sold = data["sold"]


# #         for sold in data["sold"]:
# #             concert_obj = Concert.objects.get(concert_id=concert["concert_id"])
# #             user_object.concert.add(concert_obj)

# #         serializer = UserSerializer(user_object)
# #         return Response(serializer.data)
