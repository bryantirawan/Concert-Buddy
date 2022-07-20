from django.urls import path

from .views import (
    api_select_concert, 
    api_select_concert_for_city,
    api_users, 
    api_get_concert_by_artist,
    log_concert, 
    api_concerts,
)

urlpatterns = [
    path(
        "users/",
        api_users,
        name="api_users",
    ),
    path(
        "selectconcerts/",
        api_select_concert,
        name="api_select_concerts"
    ),
    path(
        "selectconcertsforcity/<str:location>/<str:page>/",
        api_select_concert_for_city,
        name="api_select_concert_for_city"
    ),
    path(
        "concerts/artist/<str:pk>/",
        api_get_concert_by_artist,
        name="api_get_concert_by_artist"
    ),
    path('add/<str:concertdict>/', log_concert, name='log_concert'),
    path(
        "concerts/",
        api_concerts,
        name="api_concerts",
    ),
    ]
