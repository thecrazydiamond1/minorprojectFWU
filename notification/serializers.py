from rest_framework import serializers
from .models import Notification
from account.serializers import CustomUserSerializer

class NotificationSerializer(serializers.ModelSerializer):
    worker = CustomUserSerializer( read_only=True)
    class Meta:
        model = Notification
        fields = ['id','recipient', 'task', 'message', 'is_read', 'created_at','worker']
        read_only_fields = ['recipient', 'created_at','worker'] 