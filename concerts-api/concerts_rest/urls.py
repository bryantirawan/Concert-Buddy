from django.urls import path

from .views import (
    api_concerts
)

urlpatterns = [
    path(
        "api/concerts/",
        api_concerts,
        name="api_concerts",
    ),
    ]
