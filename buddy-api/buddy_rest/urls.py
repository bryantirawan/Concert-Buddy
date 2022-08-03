from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from .views import (
    api_select_concert_for_city,
    api_get_concert_by_artist,
    log_concert,
    api_concerts,
    api_concert,
    api_get_user_concerts_withoutpk,  
    MyTokenObtainPairView, 
    api_get_fellow_concert_users,
    api_users,
)

urlpatterns = [
    path(
        "users/",
        api_users,
        name="api_users",
    ),
    path(
        "selectconcertsforcity/<str:location>/<str:page>/",
        api_select_concert_for_city,
        name="api_select_concert_for_city"
    ),
    path(
        "users/",
        api_users,
        name="api_users",
    ),

    path(
        "concerts/artist/<str:pk>/",
        api_get_concert_by_artist,
        name="api_get_concert_by_artist"
    ),
    path('add/<str:concertdict>/',
        log_concert,
        name='log_concert'
    ),
    path(
        "concerts/",
        api_concerts,
        name="api_concerts",
    ),
    path(
        "concert/<str:pk>/",
        api_concert,
        name="api_concert",
    ),
    path(
        "concertfellowusers/<str:pk>/",
        api_get_fellow_concert_users,
        name="api_get_fellow_concert_users",
    ),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('userconcerts/', api_get_user_concerts_withoutpk, name="api_get_user_concert_list_withoutpk"  )
    ]
