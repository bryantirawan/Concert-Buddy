from django.contrib import admin

# Register your models here.
from .models import ConcertVO, UserVO, Ticket, Order, OrderItem

class OrderAdmin(admin.ModelAdmin):
    list_display = ['ordered', 'tickets']

# Register your models here.
admin.site.register(ConcertVO)
admin.site.register(UserVO)
admin.site.register(Ticket)
admin.site.register(Order)
admin.site.register(OrderItem)
