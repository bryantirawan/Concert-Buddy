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
        "venue_id",
        "artist_id",
      
    ]

