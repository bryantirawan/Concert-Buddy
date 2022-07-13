
import django
import os
import sys
import time
import json
import requests


sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ticket_project.settings")
django.setup()


from ticket_rest.models import UserVO


def poll():
    while True:
        print('Ticket user poller polling for data')
        try:
            url = "http://buddy-api:8000/api/users/"
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
        time.sleep(30)


if __name__ == "__main__":
    poll()
