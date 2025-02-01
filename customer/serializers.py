from rest_framework import serializers
from .models import Task
from account.serializers import CustomUserSerializer

class TaskSerializer(serializers.ModelSerializer):
    customer = CustomUserSerializer(read_only=True) 
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'customer', 'created_at']
        read_only_fields = ['customer', 'created_at']
