from django.urls import path

from .views import (
    api_concerts
)

urlpatterns = [
    path(
        "concerts/",
        api_concerts,
        name="api_concerts",
    ),
    ]
