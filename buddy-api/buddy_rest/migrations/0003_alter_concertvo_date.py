# Generated by Django 4.0.3 on 2022-07-13 05:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("buddy_rest", "0002_alter_concertvo_date"),
    ]

    operations = [
        migrations.AlterField(
            model_name="concertvo",
            name="date",
            field=models.DateTimeField(null=True),
        ),
    ]
