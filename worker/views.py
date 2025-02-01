from urllib import request
from rest_framework import viewsets
from .models import Application
from .serializers import ApplicationSerializer
from rest_framework.permissions import IsAuthenticated
from notification.models import Notification  # Import the Notification model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from customer.models import Task  # Make sure to import your Task model
from .serializers import TaskSerializer  # Make sure to import your Task serializer

class TaskListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tasks = Task.objects.all()  # Adjust this query based on your requirements
        serializer = TaskSerializer(tasks, many=True)
        return Response({'tasks': serializer.data})



class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    import logging

    logger = logging.getLogger(__name__)


    def perform_create(self, serializer):
        # Save the application with the logged-in worker
        application = serializer.save(worker=self.request.user)
        
        
        # Access the task that the worker is applying for
        task = application.task
        worker_message = application.message
        
        # Create a notification for the customer who posted the task
        notification = Notification.objects.create(
            recipient=task.customer,  # The customer who posted the task
            worker=application.worker,
            task=task,
            message=f"A worker has applied for your task: {task.title}. worker's message:{worker_message }",
        )
        self.logger.info(f"Created notification: {notification.message} for {notification.recipient}")

    

