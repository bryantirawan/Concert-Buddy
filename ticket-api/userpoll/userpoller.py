import django
import os
import sys
import time
import json
import requests
from ticket_rest.models import UserVO


sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ticket_project.settings")
django.setup()
BUDDY_API = os.environ["BUDDY_API"]


def poll():
    while True:
        print("Ticket user poller polling for data")
        try:
            url = f"{BUDDY_API}/api/users/"
            response = requests.get(url)
            content = json.loads(response.content)
            for user in content["users"]:
                UserVO.objects.update_or_create(
                    import_href=user["import_href"],
                    defaults={
                        "email": user["email"],
                        "first_name": user["first_name"],
                        "last_name": user["last_name"],
                    },
                )
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(5)


if __name__ == "__main__":
    poll()
