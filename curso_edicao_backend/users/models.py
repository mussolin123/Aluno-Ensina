from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'  # E-mail como campo único de autenticação
    REQUIRED_FIELDS = ['username']  # 'username' se necessário
