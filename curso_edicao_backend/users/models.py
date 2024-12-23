from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    workplace = models.CharField(max_length=255, blank=True)
    
    # Armazena tipos de usuário usando escolhas fixas
    USER_TYPES = [
        ('professor', 'Professor'),
        ('aluno', 'Aluno'),
        ('servidor', 'Servidor'),
        ('outros', 'Outros'),
    ]
    user_types = models.CharField(max_length=50, choices=USER_TYPES, blank=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
