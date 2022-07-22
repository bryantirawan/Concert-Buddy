from django.conf.urls import url, include 
from .views import ConcertViewSet, UserViewSet 
from rest_framework.routers import DefaultRouter 

router = DefaultRouter() 
router.register('')