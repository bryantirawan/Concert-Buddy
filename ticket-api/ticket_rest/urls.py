from django.urls import path
from .views import (
    api_get_addresses,
    api_get_orderitems,
    api_get_tickets,
    api_update_tickets,
    api_change_sold_ticket,
)


urlpatterns = [
    path("tickets/", api_get_tickets, name="api_get_tickets"),
    path("tickets/<int:pk>/", api_update_tickets, name="api_update_tickets"),
    path(
        "changetickets/<int:pk>/", api_change_sold_ticket, name="api_change_sold_ticket"
    ),
    path("orderitems/", api_get_orderitems, name="api_get_orderitems"),
    path("addresses/", api_get_addresses, name="api_get_addresses"),
]
