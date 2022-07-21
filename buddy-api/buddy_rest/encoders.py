from common.json import ModelEncoder
import json 
from .models import User, ConcertVO

class ConcertEncoder(ModelEncoder):
    model = ConcertVO
    properties = [
        "venue",
        "city",
        "date",
        "artist",
        "concert_id",
    ]

    def get_extra_data(self, o):
        return {'import_href': f'/api/concerts/{o.id}'}


class UserEncoder(ModelEncoder):
    model = User
    properties = [
        "email",
        "first_name", 
        "last_name", 
    ]
    # encoders = {
    #     "concert": ConcertEncoder(),
    # }
    def get_extra_data(self, o):
        return {
            'import_href': f'/api/users/{o.id}',
            # 'concert': o.concert.all()
        }

