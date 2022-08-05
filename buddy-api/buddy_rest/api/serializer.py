from rest_framework import serializers
from buddy_rest.models import Concert, User
from django.contrib.auth import get_user_model


class ConcertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concert
        fields = [
            "id",
            "venue",
            "city",
            "date",
            "artist",
            "concert_id",
            "venue_id",
            "artist_id",
            "fellow_user",
        ]
        depth = 1


class UserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    ######
    def validate(self, data):
        if data["password1"] != data["password2"]:
            raise serializers.ValidationError("Passwords must match.")
        return data

    def create(self, validated_data):
        data = {
            key: value
            for key, value in validated_data.items()
            if key not in ("password1", "password2")
        }
        data["password"] = validated_data["password1"]
        return self.Meta.model.objects.create_user(**data)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "concert",
            "password1",
            "password2",
        ]
        depth = 2
        read_only_fields = ("id",)
