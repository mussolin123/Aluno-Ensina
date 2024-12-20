from django.contrib import admin
from django.urls import path, include  # include é usado para incluir URLs de apps

urlpatterns = [
    path('admin/', admin.site.urls),  # URL para o admin do Django
    path('api/', include('users.urls')),  # Incluindo as URLs do app 'users'
]
