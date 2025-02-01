from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ContactMessageSerializer
from .models import ContactMessage
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics,status
from rest_framework.permissions import AllowAny
# contact/views.py

class ContactMessageView(generics.ListCreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Contact form submitted successfully"}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # Log the validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)