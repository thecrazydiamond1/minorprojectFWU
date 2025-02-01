# views.py
from rest_framework import viewsets, permissions
from .models import  Message
from .serializers import  MessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Custom logic if needed
        return super().create(request, *args, **kwargs)
    http_method_names = ['get', 'post']



















# from django.shortcuts import render
# from rest_framework import viewsets, permissions
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from .models import Message  #Conversation
# from .serializers import MessageSerializer # ConversationSerializer
# from django.shortcuts import get_object_or_404
# from rest_framework import serializers
# from account.models import CustomUser
# from .models import Thread
# from .serializers import ThreadSerializer

# class ThreadViewSet(viewsets.ModelViewSet):
#     queryset = Thread.objects.all()
#     serializer_class = ThreadSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return self.queryset.filter(participants=self.request.user)

#     @action(detail=True, methods=['post'])
#     def add_message(self, request, pk=None):
#         thread = self.get_object()
#         message = Message.objects.create(
#             thread=thread,
#             sender=request.user,
#             content=request.data['content']
#         )
#         return Response(MessageSerializer(message).data)

# class MessageViewSet(viewsets.ModelViewSet):
#     queryset = Message.objects.all()
#     serializer_class = MessageSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return self.queryset.filter(thread__participants=user)



# # class MessageViewSet(viewsets.ModelViewSet):
# #     queryset = Message.objects.all()
# #     serializer_class = MessageSerializer
# #     permission_classes = [IsAuthenticated]

# #     def get_queryset(self):
# #         user = self.request.user
# #         return self.queryset.filter(receiver=user)

#     # def perform_create(self, serializer):
#     # # Get the conversation from the request data
#     #     conversation_id = self.request.data.get('conversation')
    
#     #     if not conversation_id:
#     #        raise serializers.ValidationError({'conversation': 'This field is required.'})
    
#     # # Validate that the conversation exists
#     #     try:
#     #         conversation = Conversation.objects.get(id=conversation_id)
#     #     except Conversation.DoesNotExist:
#     #         raise serializers.ValidationError({'conversation': 'Invalid conversation.'})
    
#     # # Save the message with the conversation and sender
#     #     serializer.save(sender=self.request.user, conversation=conversation)


#     # @action(detail=False, methods=['get'])
#     # def inbox(self, request):
#     #     user = request.user
#     #     messages = Message.objects.filter(recipient=user)
#     #     serializer = self.get_serializer(messages, many=True)
#     #     return Response(serializer.data)

#     # @action(detail=False, methods=['get'])
#     # def sent(self, request):
#     #     user = request.user
#     #     messages = Message.objects.filter(sender=user)
#     #     serializer = self.get_serializer(messages, many=True)
#     #     return Response(serializer.data)

    
# # class ConversationViewSet(viewsets.ModelViewSet):
# #     queryset = Conversation.objects.all()
# #     serializer_class = ConversationSerializer
# #     permission_classes = [IsAuthenticated]

# #     def get_queryset(self):
# #         user = self.request.user
# #         return Conversation.objects.filter(user1=user) | Conversation.objects.filter(user2=user)

# #     def perform_create(self, serializer):
# #         user1_id = self.request.data.get('user1')
# #         user2_id = self.request.data.get('user2')

# #         if not user1_id or not user2_id:
# #             raise serializers.ValidationError("Both user1 and user2 are required.")

# #         # Retrieve user instances from the database
# #         try:
# #             user1 = CustomUser.objects.get(id=user1_id)
# #             user2 = CustomUser.objects.get(id=user2_id)
# #         except CustomUser.DoesNotExist:
# #             raise serializers.ValidationError("One or both users do not exist.")

# #         # Check if the conversation already exists
# #         conversation, created = Conversation.objects.get_or_create(
# #             user1=user1,
# #             user2=user2
# #         )

# #         if not created:
# #             raise serializers.ValidationError("This conversation already exists.")

# #         # Save the new conversation
# #         serializer.save(user1=conversation.user1, user2=conversation.user2)