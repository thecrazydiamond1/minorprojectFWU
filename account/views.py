from audioop import avg
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from rest_framework.permissions import AllowAny
from django.conf import settings


from .serializers import (
    RegisterSerializer, 
    LoginSerializer, 
    ForgotPasswordSerializer, 
    VerifyOTPSerializer,
    CustomUserSerializer, 
    UpdateUserSerializer,
    ResetPasswordSerializer,
    
)
from .models import CustomUser
import random
from django.contrib.auth import authenticate, logout
from django.utils import timezone
from datetime import timedelta
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, permissions, generics,status
from .models import CustomUser
from django.http import HttpResponse
from rest_framework import status
from django.contrib.auth.models import User


def home(request):
    return HttpResponse("<h1>Welcome to HomEase</h1>")

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
         user = serializer.save()
         token, created = Token.objects.get_or_create(user=user)
         return Response({
            "user": CustomUserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key
        })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@method_decorator(csrf_exempt, name='dispatch')
class LoginAPI(APIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        
        user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
        print(serializer.validated_data)
        if user.email!= serializer.validated_data['email']:
           return Response({"error": "Invalid credentials"}, status=400)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "user": {
                    "is_worker": user.is_worker,
                    "is_client": user.is_client,
                }
            })
        return Response({"error": "Invalid credentials"}, status=400)

# class LoginAPI(APIView):
#     serializer_class = LoginSerializer
#     permission_classes = [AllowAny]

#     def post(self, request, *args, **kwargs):
#         serializer = self.serializer_class(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
#         if user:
#             token, created = Token.objects.get_or_create(user=user)
#             return Response({"token": token.key})
#         return Response({"error": "Invalid credentials"}, status=400)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.core.exceptions import PermissionDenied
import logging

logger = logging.getLogger(__name__)


class LogoutAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if hasattr(request.user, 'auth_token'):
            request.user.auth_token.delete()
        return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)

    
@method_decorator(csrf_exempt, name='dispatch')
class ForgotPasswordAPI(APIView):
    
    serializer_class = ForgotPasswordSerializer
    permission_classes = [AllowAny]

    def generate_otp(self):
        otp = random.randint(100000, 999999)
        return str(otp)
    
    permission_classes = [AllowAny]

    def send_otp_email(self, email, otp):
        subject = 'Password Reset OTP'
        message = f'Your OTP for password reset is: {otp}'
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [email]
        send_mail(subject, message, from_email, recipient_list)
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        print(email)
        user = CustomUser.objects.filter(email=email).first()
        print(user)
        if user:
            otp = self.generate_otp()
            user.otp = otp
            user.otp_expiration = timezone.now() + timedelta(minutes=10)  # OTP expires in 10 minutes
            user.save()

            # Send OTP email
            self.send_otp_email(email, otp)
            return Response({"message": "OTP has been sent to your email.","otp":otp}, status=status.HTTP_200_OK)
        
        return Response({"error": "User with this email does not exist."}, status=status.HTTP_404_NOT_FOUND)
   
class VerifyOTPAPI(APIView):
    serializer_class = VerifyOTPSerializer
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        otp = serializer.validated_data['otp']
        user = CustomUser.objects.filter(email=email).first()
        
        if user:
            if user.otp == otp and timezone.now() < user.otp_expiration:
                return Response({"message": "OTP verified successfully."})
            else:
                return Response({"error": "Invalid OTP or OTP has expired."}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "User with this email does not exist."}, status=status.HTTP_404_NOT_FOUND)




from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from django.db.models import Avg
from .models import CustomUser
from .serializers import CustomUserSerializer, UpdateUserSerializer
import logging

logger = logging.getLogger(__name__)

class UserProfileAPI(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UpdateUserSerializer

    def get_object(self):
        unique_id = self.kwargs.get('unique_id')  # Get unique_id from the URL
        if unique_id:
            user = get_object_or_404(CustomUser, unique_id=unique_id)  # Fetch user by unique_id
            logger.info(f'Fetched profile for user: {user.username} (Unique ID: {user.unique_id})')
        else:
            user = self.request.user  # Fetch the authenticated user's profile
            logger.info(f'Fetched authenticated user profile: {user.username} (Unique ID: {user.unique_id})')

        return user

    def get(self, request, *args, **kwargs):
        user = self.get_object()  # Get the user object
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)

    # def get(self, request, *args, **kwargs):
    #     user = self.get_object()  # Get the user object

    #     # Get reviews and calculate average rating if the user is a worker
    #     if user.is_worker:
    #         reviews = Review.objects.filter(worker=user)  # Get all reviews for the worker
    #         avg_rating = reviews.aggregate(Avg('rating'))['rating__avg']  # Calculate the average rating

    #         # Serialize user and review data
    #         user_serializer = CustomUserSerializer(user)
    #         review_serializer = ReviewSerializer(reviews, many=True)

    #         response_data = {
    #             'user': user_serializer.data,
    #             'avg_rating': avg_rating,
    #             'reviews': review_serializer.data,
    #         }
    #     else:
    #         # For clients or non-workers, just return the profile
    #         user_serializer = CustomUserSerializer(user)
    #         response_data = {
    #             'user': user_serializer.data,
    #         }

    #     return Response(response_data)




    def put(self, request, *args, **kwargs):
        logger.info(f"Incoming data: {request.data}")
        user = self.get_object()  # Get the user object
        if self.request.method == 'PUT' and user != request.user:
            raise PermissionDenied("You can only update your own profile.")

        serializer = UpdateUserSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


    
class ResetPasswordAPI(APIView):
    serializer_class = ResetPasswordSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        print(email)
        new_password = serializer.validated_data['new_password']
        print(new_password)

        user = CustomUser.objects.filter(email=email).first()
        if user:
            user.set_password(new_password)
            user.otp = None  # Clear OTP after successful reset
            user.otp_expiration = None
            user.save()
            return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)
        
        return Response({"error": "User with this email does not exist."}, status=status.HTTP_404_NOT_FOUND)
