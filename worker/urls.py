from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ApplicationViewSet, TaskListView  # Import your TaskListView

router = DefaultRouter()
router.register(r'applications', ApplicationViewSet, basename='application')

app_name = 'worker'
urlpatterns = [
    path('tasks/', TaskListView.as_view(), name='worker-tasks'),  # Add this line
    path('', include(router.urls)),
]
