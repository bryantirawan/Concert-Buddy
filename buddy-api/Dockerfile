FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

COPY requirements.txt requirements.txt
COPY manage.py manage.py

COPY buddy_project buddy_project
COPY common common
COPY buddy_rest buddy_rest

RUN pip install -r requirements.txt
CMD python manage.py migrate && gunicorn buddy_project.wsgi --bind 0.0.0.0:$PORT --log-file -
