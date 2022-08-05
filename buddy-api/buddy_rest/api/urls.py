from django.urls import path, include
from .views import ConcertViewSet, UserViewSet, SignUpView
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register("concert", ConcertViewSet, basename="concert")
router.register("user", UserViewSet, basename="user")

urlpatterns = [
    path("", include(router.urls)),
    path("sign_up/", SignUpView.as_view(), name="sign_up"),
]
