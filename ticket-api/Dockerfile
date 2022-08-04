FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

COPY requirements.txt requirements.txt
COPY manage.py manage.py

COPY ticket_project ticket_project
COPY common common
COPY ticket_rest ticket_rest

RUN pip install -r requirements.txt
CMD python manage.py migrate && gunicorn ticket_project.wsgi --bind 0.0.0.0:$PORT --log-file -
