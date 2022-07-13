from django.contrib import admin

# Register your models here.
from .models import ConcertVO, UserVO

# Register your models here.
admin.site.register(ConcertVO)
admin.site.register(UserVO)