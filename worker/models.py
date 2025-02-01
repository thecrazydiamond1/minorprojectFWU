from django.db import models
from django.conf import settings
from customer.models import Task


# class Task(models.Model):
#     title = models.CharField(max_length=255)
#     description = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     # Add any other fields you need

#     def __str__(self):
#         return self.title


class Application(models.Model):
    task = models.ForeignKey(Task, related_name='applications', on_delete=models.CASCADE)
    worker = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='applications', on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Application by {self.worker} for {self.task}'
