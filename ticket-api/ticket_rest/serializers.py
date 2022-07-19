from django_countries.serializer_fields import CountryField
from rest_framework import serializers
from .models import Ticket

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class TicketSerializer(serializers.ModelSerializer):
    # category = serializers.SerializerMethodField()
    # label = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = (
            'id',
            'price',
            'section',
            'row',
            'seat',
            'sold',
            'picture_url',
            'concert',
            'seller'
        )

    # def get_category(self, obj):
    #     return obj.get_category_display()

    # def get_label(self, obj):
    #     return obj.get_label_display()
