from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password 
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from django.utils import timezone
from .models import CustomUser
User = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'unique_id','username', 'email', 'is_client','profile_picture', 'is_worker','first_name', 'last_name']
        

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password','profile_picture','is_worker','is_client','first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False}
            
        }

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(write_only=True, required=True)
    last_name = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'password2', 'email', 'is_worker', 'is_client','first_name', 'last_name']
        extra_kwargs = {
            'is_worker': {'required': True},
            'is_client': {'required': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            is_worker=validated_data['is_worker'],
            is_client=validated_data['is_client'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']

        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)

class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

class VerifyOTPSerializer(serializers.Serializer):
     email = serializers.EmailField()
     otp = serializers.CharField(max_length=6)

class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)
    new_password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = CustomUser.objects.filter(email=data['email']).first()
        if user:
            if user.otp == data['otp'] and timezone.now() < user.otp_expiration:
                return data
            raise serializers.ValidationError("Invalid OTP or OTP has expired.")
        raise serializers.ValidationError("User with this email does not exist.")
        