from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.request import Request

from rest_framework.views import APIView
from rest_framework import permissions
from  rest_framework import status

from .models import *
from accounts.models import User

# Create your views here.
class AllFilesView(APIView):
    permission_classes = [permissions.AllowAny]
    def get_object(self):
        return self.request.user.is_authenticated

    def get(self, request):
        print(request)
        if get_object := self.get_object():
            return Response({"auth": str(get_object)})
        return Response({'auth': False})