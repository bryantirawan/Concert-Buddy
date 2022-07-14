from django.urls import path

from .views import (
    api_get_concert_by_artist,
    api_get_concert_by_location,
    api_get_tickets,
    api_list_concerts,
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
        "concerts/<str:pk>/",
        api_get_concert_by_artist,
        name="api_get_concert_by_artist"
    ),
    path(
        "tickets/",
        api_get_tickets,
        name="api_get_tickets"
    )
]
