from django.shortcuts import render
# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny

from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import MyTokenObtainPairSerializer, RegisterSerializer
# Create your views here.

User = get_user_model()

#Login User
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

#Register User
class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer