
import django
import os
import sys
import time
import json
import requests


sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ticket_project.settings")
django.setup()


from ticket_rest.models import ConcertVO


def poll():
    while True:
        print('Ticket poller polling for data')
        try:
            url = "http://buddy-api:8000/api/concerts/"
            response = requests.get(url)
            content = json.loads(response.content)
            for concert in content["concerts"]:
                print(concert)
                ConcertVO.objects.update_or_create(
                    import_href=concert["import_href"],
                    defaults={
                        "venue": concert["venue"],
                        "city": concert["city"],
                        "date": concert["date"],
                        "artist": concert["artist"],
                        "concert_id": concert["concert_id"],
                                            },
                )
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(5)


if __name__ == "__main__":
    poll()
