from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings
from customer.models import Task
from account.serializers import CustomUserSerializer
from account.models import CustomUser

class Notification(models.Model):

    worker = models.ForeignKey(CustomUser, related_name='worker_notifications', on_delete=models.CASCADE)
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.recipient.username} on task {self.task.id}"
