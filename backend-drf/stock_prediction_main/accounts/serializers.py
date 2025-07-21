from django.contrib.auth.models import User
from django.contrib.auth import aauthenticate,login
from rest_framework import serializers

from rest_framework.exceptions import ValidationError

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise ValidationError("Email already exists. Please login.")
        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)









#  -------------------| NOT COMPLETED |-----------------

# class UserLoginSerializer(serializers.ModelSerializer):
#     def validate(self, attrs):
#         user=aauthenticate(userrname=attrs['username'],password=attrs['password']) or aauthenticate(email=attrs['username'],password=attrs['password'])
#         if not user:
#             return serializers.ValidationError('User not found please register first...')
#         else:
#             attrs['user'] = user
#         return attrs
