from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterAPI, LoginAPI, ForgotPasswordAPI, UserProfileAPI, LogoutAPI, VerifyOTPAPI,ResetPasswordAPI

router = DefaultRouter()
app_name='account'
urlpatterns = [
    path('register/', RegisterAPI.as_view(), name='api_register'),
    path('login/', LoginAPI.as_view(), name='api_login'),
    path('forgotpassword/', ForgotPasswordAPI.as_view(), name='api_forgotpassword'),
    path('profile/', UserProfileAPI.as_view(), name='api_profile'),
    path('logout/', LogoutAPI.as_view(), name='api_logout'),
    path('verify-otp/', VerifyOTPAPI.as_view(), name='verify-otp'),
     path('reset-password/', ResetPasswordAPI.as_view(), name='reset-password'),
     path('profile/<uuid:unique_id>/', UserProfileAPI.as_view(), name='user-profile'),
]


