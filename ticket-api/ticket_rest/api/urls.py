from django.urls import path, include
from .views import OrderViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('order', OrderViewSet, basename="order")
# router.register('user', UserViewSet, basename="user")

urlpatterns = [
    path('', include(router.urls))
]
