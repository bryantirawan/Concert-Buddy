from common.json import ModelEncoder

from .models import Address, ConcertVO, OrderItem, UserVO, Ticket

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

    def get_extra_data(self, o):
        return {"concert_id": o.concert.concert_id}


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

class AddressEncoder(ModelEncoder):
    model = Address
    properties = [
        "user",
        "street_address",
        "apartment_address",
        "country",
        "zip"

    ]
    encoders = {
        "user": UserVOEncoder()
    }

class OrderItemEncoder(ModelEncoder):
    model = OrderItem
    properties = [
        "id",
        "user",
        "ticket",
        "address_for_order_item",
        "buyer_venmo"
    ]
    encoders = {
        "user": UserVOEncoder(),
        "ticket": TicketDetailEncoder(),
        "address_for_order_item": AddressEncoder()
    }
