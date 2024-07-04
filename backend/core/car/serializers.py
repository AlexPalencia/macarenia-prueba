from .models import Personas
from rest_framework import serializers


class PersonasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personas
        fields = '__all__'