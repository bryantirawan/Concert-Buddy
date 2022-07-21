from django.urls import path

from .views import (
    api_get_concert_by_artist,
    api_get_concert_by_location,
    api_get_tickets,
    api_list_concerts,
    api_tickets_by_concert,
    api_update_tickets
)

urlpatterns = [
    path(
        "concerts/",
        api_list_concerts,
        name="api_list_concerts"
    ),
    path(
        "concerts/<str:pk>/",
        api_get_concert_by_location,
        name="api_get_concert_by_location"
    ),
    path(
        "concerts/artist/<str:pk>/",
        api_get_concert_by_artist,
        name="api_get_concert_by_artist"
    ),
    path(
        "tickets/",
        api_get_tickets,
        name="api_get_tickets"
    ),
     path(
        "tickets/<int:pk>/",
        api_update_tickets,
        name="api_update_tickets"
    ),
      path(
        "concerttickets/<str:pk>/",
        api_tickets_by_concert,
        name="api_tickets_by_concert"
    ),
]

