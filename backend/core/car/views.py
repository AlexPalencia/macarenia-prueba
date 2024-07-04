from django.shortcuts import render
from .models import Personas
from .serializers import PersonasSerializer
from rest_framework import viewsets, filters
from django.db.models import Q
# Create your views here.

class PersonaViewSet(viewsets.ModelViewSet):

    queryset = Personas.objects.all()
    serializer_class = PersonasSerializer

    def get_queryset(self):
        filter_kwargs = {}        
        tipo_documento = self.request.GET.get("tipo_documento", None)
        if tipo_documento is not None and tipo_documento != 'null' and int(tipo_documento) > 0:
            filter_kwargs["tipo_documento__in"] = [tipo_documento]
        
        numero_documento = self.request.GET.get("numero_documento", None)
        if numero_documento is not None and numero_documento != 'null' and int(numero_documento) > 0:
            filter_kwargs["numero_documento__in"] = [numero_documento]

        _filter = Q(**filter_kwargs)
        queryset = super().get_queryset().filter(_filter)
        return queryset
