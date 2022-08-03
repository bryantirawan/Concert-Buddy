from common.json import ModelEncoder
from .models import Concert, User


class ConcertEncoder(ModelEncoder):
    model = Concert
    properties = [
        "id",
        "venue",
        "city",
        "date",
        "artist",
        "concert_id",
        "venue_id",
        "artist_id",
    ]

    def get_extra_data(self, o):
        return {'import_href': f'/api/concerts/{o.id}'}


class UserEncoder(ModelEncoder):
    model = User
    properties = [
        "email",
        "first_name",
        "last_name",
        "username",
        "id"
    ]
    def get_extra_data(self, o):
        return {
            'import_href': f'/api/users/{o.id}'
        }
