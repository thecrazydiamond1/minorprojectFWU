from django.urls import path
from .views import NotificationList, MarkNotificationAsRead, ApplyForTask

app_name = 'notification'

urlpatterns = [
    path('', NotificationList.as_view(), name='notifications'),
    path('<int:pk>/read/', MarkNotificationAsRead.as_view(), name='mark_as_read'),
    path('tasks/<int:task_id>/apply/', ApplyForTask.as_view(), name='apply_for_task'),  # New URL for applying
]
