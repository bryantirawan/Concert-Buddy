FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

COPY ticket-api/requirements.txt requirements.txt
COPY ticket-api/manage.py manage.py

COPY ticket-api/ticket_project ticket_project
COPY ticket-api/common common
COPY ticket-api/ticket_rest ticket_rest
COPY ticket-api/poll/poller.py poller.py
COPY ticket-api/userpoll/userpoller.py userpoller.py

RUN pip install -r requirements.txt
CMD python poller.py
