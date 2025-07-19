from django.shortcuts import render
from .serializers import (UserRegistrationSerializer,
                        #   UserLoginSerializer
                          )
from rest_framework import generics
from django.contrib.auth.models import User
from django.contrib.auth import login
from .permission import IsNotAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class UserRegistrationView(generics.CreateAPIView):
    serializer_class=UserRegistrationSerializer
    queryset=User.objects.all()
    permission_classes=[IsNotAuthenticated]







#  -------------------| NOT COMPLETED |-----------------
# class UserLoginView(APIView):
#     def post(self,request):
#         serializer = UserLoginSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.validated_data['user']
#             login(request, user)  # Django login
#             return Response({"message": "Login successful!"})
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

