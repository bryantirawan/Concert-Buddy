# Generated by Django 4.0.3 on 2022-07-13 19:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ticket_rest', '0002_alter_concertvo_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='uservo',
            name='first_name',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='uservo',
            name='last_name',
            field=models.CharField(max_length=200, null=True),
        ),
    ]