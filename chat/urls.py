# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import ThreadViewSet, MessageViewSet #ConversationViewSet

# router = DefaultRouter()
# router.register(r'threads', ThreadViewSet)
# router.register(r'messages', MessageViewSet)
# #router.register(r'conversations', ConversationViewSet)
# app_name='chat'
# urlpatterns = [
#     path('', include(router.urls)),
# ]
from django.urls import path
from .views import MessageViewSet
app_name='chat'
urlpatterns = [
    path('messages/', MessageViewSet.as_view({'get': 'list', 'post': 'create'}), name='message-list'),
    # other routes...
]
