# Generated by Django 4.0.3 on 2022-07-15 20:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("buddy_rest", "0005_alter_concertvo_date"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="concertvo",
            name="name",
        ),
    ]
