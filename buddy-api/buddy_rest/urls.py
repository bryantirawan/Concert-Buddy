from django.urls import path

from .views import (
    api_select_concert,
    api_users
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
    )
    ]
