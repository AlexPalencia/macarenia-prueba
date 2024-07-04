from django.db import models

# Create your models here.
class Personas(models.Model):

    GENERO = [
        (1, 'Mujer'),
        (2, 'Hombre'),
        (3, 'Otros'),
    ]

    TIPODOCUMENTO = [
        (1, 'Cédula de ciudadanía'),
        (2, 'Registro civil'),
        (3, 'NUIP'),
        (4, 'Pasaporte'),
        (5, 'Permiso especial de permanencia'),
        (6, 'Cédula extranjera'),
        (7, 'Tarjeta de indentidad'),
    ]

    ESTADOCIVIL = [
        (1, 'Soltero'),
        (2, 'Casado'),
        (3, 'Viudo'),
        (4, 'Unión Libre'),
        (5, 'Divorciado'),
    ]

    primer_nombre = models.CharField(max_length=50)
    segundo_nombre = models.CharField(max_length=50, blank=True, null=True)
    primer_apellido = models.CharField(max_length=50)
    segundo_apellido = models.CharField(max_length=50, blank=True, null=True)
    tipo_documento =  models.CharField(max_length=50, choices=TIPODOCUMENTO)
    numero_documento =  models.CharField(max_length=15, unique=True)
    fecha_nacimiento = models.DateField()
    genero = models.CharField(max_length=50, choices=GENERO)
    estado_civil = models.CharField(max_length=50, choices=ESTADOCIVIL)
    pais = models.IntegerField()