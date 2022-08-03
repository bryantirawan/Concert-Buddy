from django.contrib import admin
from .models import ConcertVO, UserVO, Ticket, OrderItem, Address



admin.site.register(ConcertVO)
admin.site.register(UserVO)
admin.site.register(Ticket)
admin.site.register(OrderItem)
admin.site.register(Address)
