from rest_framework import serializers
from .models import Application
from rest_framework import serializers
from customer.models import Task  # Make sure to import your Task model
from account.serializers import CustomUserSerializer
class TaskSerializer(serializers.ModelSerializer):
    customer=CustomUserSerializer(read_only=True)
    class Meta:
        model = Task  # Specify your Task model
        fields = ['id', 'title', 'description','customer']  # List the fields you want to include in the serialization

class ApplicationSerializer(serializers.ModelSerializer):
    worker = CustomUserSerializer(read_only=True)
    class Meta:
        model = Application
        fields = ['id', 'task', 'message', 'created_at','worker']
        read_only_fields = ['worker', 'created_at']

        def create(self, validated_data):
         worker = self.context['request'].user  # Assuming user is logged in
         application = Application.objects.create(worker=worker, **validated_data)
         return application

