from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        # Procurar o usuário pelo e-mail
        user = User.objects.filter(email=data['email']).first()

        # Se não encontrar um usuário com o e-mail fornecido
        if not user:
            raise serializers.ValidationError("Credenciais inválidas")

        # Verificar se a senha está correta
        if not user.check_password(data['password']):
            raise serializers.ValidationError("Credenciais inválidas")

        return user
