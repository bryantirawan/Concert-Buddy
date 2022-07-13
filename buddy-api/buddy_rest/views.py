from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse

from .encoders import ( UserEncoder,)
from .models import User


@require_http_methods(["GET", "POST"])
def api_users(request):
    if request.method == "GET":
        users = User.objects.all()
        return JsonResponse(
            {"users": users},
            encoder=UserEncoder,
        )
    else:
        return "Create POST REQUEST VIEW"
