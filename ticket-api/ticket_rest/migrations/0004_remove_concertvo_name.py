# Generated by Django 4.0.3 on 2022-07-15 20:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ticket_rest', '0003_uservo_first_name_uservo_last_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='concertvo',
            name='name',
        ),
    ]
