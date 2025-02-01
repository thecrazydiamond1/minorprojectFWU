# serializers.py
from rest_framework import serializers
from .models import  Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'





# class MessageSerializer(serializers.ModelSerializer):
#     sender_username = serializers.ReadOnlyField(source='sender.username')
#     recipient_username = serializers.ReadOnlyField(source='recipient.username')

#     class Meta:
#         model = Message
#         fields =['id', 'sender', 'recipient', 'content', 'timestamp', 'sender_username', 'recipient_username','conversation']

#class ConversationSerializer(serializers.ModelSerializer):
    #class Meta:
       # model = Conversation
        #fields = ['id', 'user1', 'user2', 'created_at']
