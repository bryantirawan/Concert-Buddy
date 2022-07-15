from common.json import ModelEncoder

from .models import Concert

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

