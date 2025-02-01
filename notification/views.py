from urllib import request
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Notification # Include Application if you have it
from customer.models import Task
from .serializers import NotificationSerializer  # Update as necessary
import logging
from worker.models import Application
from rest_framework.views import APIView
logger = logging.getLogger(__name__)


class NotificationList(APIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # notifications = Notification.objects.filter(recipient=user).select_related('worker', 'task')
        notifications= Notification.objects.all()
        for notification in notifications:
            print(notification.worker)  # Debug: Check if worker data is available
        return notifications

    def get(self, request):
        notifications = self.get_queryset()
        # logger.info(f"Fetched notifications for user {request.user}: {notifications}")
        serializer = NotificationSerializer(notifications, many=True)
        logger.info(f"Serialized data: {serializer.data}")
        return Response(serializer.data)
      
        # tasks = Task.objects.all()  # Adjust this query based on your requirements
        # serializer = TaskSerializer(tasks, many=True)
        # return Response({'tasks': serializer.data})

    

        

class MarkNotificationAsRead(generics.UpdateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        try:
            notification = Notification.objects.get(id=kwargs['pk'], recipient=request.user)
            notification.is_read = True
            notification.save()
            return Response({"status": "Notification marked as read"}, status=200)
        except Notification.DoesNotExist:
            return Response({"error": "Notification not found"}, status=404)

class ApplyForTask(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, task_id):
        try:
            task = Task.objects.get(id=task_id)
            worker_message = request.data.get('message')

            # Create the application if needed
            application = Application.objects.create(
                worker=request.user,
                task=task,
                message=worker_message  # Store the message in the application model if applicable
            )

            # Create the notification for the customer
            notification_message = (
                f"A worker has applied for your task: {task.title}.Worker's message: {worker_message}"
            )
            Notification.objects.create(
                recipient=task.customer,
                worker=application.worker,
                message=notification_message,
                is_read=False
            )

            logger.info(f"Notification sent to {task.customer} for task {task.title}")
            return Response({"status": "Application submitted"}, status=status.HTTP_201_CREATED)

        except Task.DoesNotExist:
            return Response({"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND)
