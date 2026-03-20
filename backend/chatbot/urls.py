from django.urls import path
from .views import get_data, update_conversation_title, health_check


urlpatterns = [
    path('get-data/', get_data, name='get_data'),
    path('conversations/<int:conversation_id>/update-title/', update_conversation_title, name='update-conversation-title'),
    path('health/', health_check, name='health_check'),
]
