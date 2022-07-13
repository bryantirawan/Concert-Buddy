import django
import os
import sys
import time
import json
import requests


sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "buddy_project.settings")
django.setup()


from buddy_rest.models import ConcertVO


def poll():
    while True:
        print('Buddy poller polling for data')
        url = "http://concerts-api:8000/api/concerts/"
        response = requests.get(url)
        content = json.loads(response.content)
        print(content)
        try:
            url = "http://concerts-api:8000/concerts/"
            response = requests.get(url)
            content = json.loads(response.content)
            print(content)
            for concert in content ["concerts"]:
                print("test")
                ConcertVO.objects.update_or_create(
                    import_href=concert["href"],
                    defaults={
                        "name": concert["name"],
                        "venue": concert["venue"],
                        "city": concert["city"],
                        #"date": concert["date"],
                        "artist": concert["artist"],
                        "concert_id": concert["concert_id"],
                                            },
                )
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(30)


if __name__ == "__main__":
    poll()
