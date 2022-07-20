from common.json import ModelEncoder

from .models import User, Concert

class UserEncoder(ModelEncoder):
    model = User
    properties = [
        "email",
        "first_name", 
        "last_name"
    ]

    def get_extra_data(self, o):
        return {'import_href': f'/api/users/{o.id}'}

class ConcertEncoder(ModelEncoder):
    model = Concert
    properties = [
        "venue",
        "city",
        "date",
        "artist",
        "concert_id",
    ]

    def get_extra_data(self, o):
        return {'import_href': f'/api/concerts/{o.id}'}

