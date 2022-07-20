from django.urls import path

from .views import (
    api_concert,
    api_concerts, 
    log_concert
)

urlpatterns = [
    path(
        "concerts/",
        api_concerts,
        name="api_concerts",
    ),
    path('add/<str:concertdict>/', log_concert, name='log_concert'),

    path(
        "concert/<str:pk>/", api_concert, name="api_concert",
    ),
    ]
