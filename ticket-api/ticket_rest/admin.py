from django.contrib import admin

# Register your models here.
from .models import ConcertVO, UserVO, Ticket, OrderItem, Order, Address

# Register your models here.
admin.site.register(ConcertVO)
admin.site.register(UserVO)
admin.site.register(Ticket)
admin.site.register(OrderItem)
admin.site.register(Order)
admin.site.register(Address)
