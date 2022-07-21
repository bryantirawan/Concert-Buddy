from common.json import ModelEncoder

from .models import ConcertVO, UserVO, Ticket

class ConcertVOEncoder(ModelEncoder):
    model = ConcertVO
    properties = [
        "id",
        "import_href",
        "venue",
        "city",
        "date",
        "artist",
        "concert_id",
    ]
    # def get_extra_data(self, o):
    #     return {'import_href': f'/api/concerts/{o.id}'}

class UserVOEncoder(ModelEncoder):
    model = UserVO
    properties = [
        "import_href",
        "email",
        "first_name",
        "last_name",
    ]

class TicketEncoder(ModelEncoder):
    model = Ticket
    properties = [
        "id",
        "price",
        "section",
        "row",
        "seat",
        "sold",
        "picture_url",
        "concert",
        "seller",
        "buyer"
    ]
    encoders = {
        "concert": ConcertVOEncoder(),
        "seller": UserVOEncoder(),
        "buyer": UserVOEncoder(),
    }

class TicketDetailEncoder(ModelEncoder):
    model = Ticket
    properties = [
        "id",
        "price",
        "section",
        "row",
        "seat",
        "sold",
        "picture_url",
        "concert",
        "seller",
        "buyer"
    ]
    encoders = {
        "concert": ConcertVOEncoder(),
        "seller": UserVOEncoder(),
        "buyer": UserVOEncoder(),
    }
