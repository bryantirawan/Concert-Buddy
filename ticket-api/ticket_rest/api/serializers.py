# from rest_framework import serializers
# from ticket_rest.models import (ConcertVO, UserVO, Address,
#                                     Ticket, OrderItem, Order)

# class ConcertSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ConcertVO
#         fields = ['import_href', 'venue', 'city', 'date', 'artist', 'concert_id']


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserVO
#         fields = ['import_href', 'email', 'first_name', 'last_name']


# class TicketSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Ticket
#         fields = ['price', 'section', 'row',
#                 'seat', 'sold', 'picture_url',
#                 'concert', 'seller', 'buyer']
#         depth = 1

# class OrderItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OrderItem
#         fields = ['user', 'ticket']


# class OrderSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Order
#         fields = ['tickets', 'order_date', 'shipping_address',
#                 'billing_address', 'buyer_venmo']
#         depth = 1

# class AddressSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Address
#         fields = ['user', 'street_address', 'apartment_address',
#                     'country', 'zip']
