from rest_framework import serializers
from .models import Testimonial
from django.db import models
from account.models import CustomUser
from account.serializers import CustomUserSerializer


class TestimonialSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    class Meta:
        model = Testimonial
        fields = ['id','user', 'content', 'rating', 'created_at']
        read_only_fields = ['user', 'created_at']
