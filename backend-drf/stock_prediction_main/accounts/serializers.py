from django.contrib.auth.models import User
from django.contrib.auth import aauthenticate,login
from rest_framework import serializers

class UserRegistrationSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True,style={'input_type':'password'})
    class Meta:
        model = User
        fields = ['username','email','password']


    def create(self, validated_data):
        if User.objects.filter(email=validated_data['email']):
            return serializers.ValidationError('Emial already exist... please login')
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
