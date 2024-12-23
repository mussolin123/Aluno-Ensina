from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from .models import CustomUser, UserType

class RegisterSerializer(serializers.ModelSerializer):
    user_types = serializers.ListField(
        child=serializers.CharField(max_length=50),
        allow_empty=True
    )

    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'password', 'workplace', 'user_types']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user_types_data = validated_data.pop('user_types', [])
        user = CustomUser.objects.create_user(**validated_data)
        for user_type in user_types_data:
            user_type_obj, _ = UserType.objects.get_or_create(name=user_type)
            user.user_types.add(user_type_obj)
        return user


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
