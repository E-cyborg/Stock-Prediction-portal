from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

class ProtectedView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return Response({'message': 'You are logged in!'})
        return Response({'message': 'Not logged in'}, status=401)
