from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import Concert
from django.http import JsonResponse

@require_http_methods(["GET", "POST"])
def api_concerts(request):
    if request.method == "GET":
        concerts = Concert.objects.all()
        return JsonResponse(
            {"concerts": concerts},
            encoder=ConcertEncoder,
        )
    else:
        return "Create POST REQUEST VIEW"
