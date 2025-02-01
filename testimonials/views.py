from urllib import response
from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Testimonial
from .serializers import TestimonialSerializer
from rest_framework.permissions import IsAuthenticated

class TestimonialListCreateView(generics.ListCreateAPIView):
    queryset = Testimonial.objects.all().order_by('-created_at')
    serializer_class = TestimonialSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
