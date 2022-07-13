from common.json import ModelEncoder

from .models import User

class UserEncoder(ModelEncoder):
    model = User
    properties = [
        "email",
        "first_name", 
        "last_name"
    ]

    def get_extra_data(self, o):
        return {'import_href': f'/api/users/{o.id}'}

