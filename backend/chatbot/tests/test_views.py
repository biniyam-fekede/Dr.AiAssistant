import json
from unittest.mock import patch
from django.test import TestCase, RequestFactory
from rest_framework.test import APIClient
from chatbot.models import MyUser, Message


class GetDataViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = MyUser.objects.create_user(
            email='chat@example.com',
            password='StrongPass123!',
            first_name='Test',
            last_name='User',
            phone_number='1234567890',
        )

    @patch('chatbot.views.query_huggingface')
    def test_chat_returns_response(self, mock_query):
        mock_query.return_value = "Drink plenty of water and rest."
        response = self.client.post(
            '/api/get-data/',
            data=json.dumps({'message': 'I have a headache'}),
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('response', data)
        self.assertEqual(data['response'], "Drink plenty of water and rest.")

    def test_empty_message_returns_400(self):
        response = self.client.post(
            '/api/get-data/',
            data=json.dumps({'message': ''}),
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 400)

    def test_invalid_json_returns_400(self):
        response = self.client.post(
            '/api/get-data/',
            data='not json',
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 400)

    def test_get_method_returns_400(self):
        response = self.client.get('/api/get-data/')
        self.assertEqual(response.status_code, 400)

    @patch('chatbot.views.query_huggingface')
    def test_authenticated_chat_saves_conversation(self, mock_query):
        mock_query.return_value = "Take some rest."
        self.client.force_authenticate(user=self.user)
        response = self.client.post(
            '/api/get-data/',
            data=json.dumps({'message': 'I feel dizzy'}),
            content_type='application/json',
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIsNotNone(data.get('conversation_id'))

        # Verify conversation was saved
        conv = Message.objects.get(id=data['conversation_id'])
        self.assertEqual(len(conv.conversation), 2)
        self.assertEqual(conv.conversation[0]['role'], 'user')
        self.assertEqual(conv.conversation[1]['role'], 'assistant')


class ConversationViewsTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = MyUser.objects.create_user(
            email='conv@example.com',
            password='StrongPass123!',
            first_name='Test',
            last_name='User',
            phone_number='1234567890',
        )
        self.client.force_authenticate(user=self.user)

    def test_save_new_conversation(self):
        response = self.client.post('/api/conversations/save/', {
            'title': 'Test Chat',
            'conversation': [{'role': 'user', 'content': 'hi'}],
        }, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('conversation_id', response.data)

    def test_get_conversations_list(self):
        Message.objects.create(user=self.user, title='Chat 1', conversation=[])
        Message.objects.create(user=self.user, title='Chat 2', conversation=[])
        response = self.client.get('/api/conversations/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_update_conversation_title(self):
        conv = Message.objects.create(user=self.user, title='Old Title', conversation=[])
        response = self.client.put(
            f'/api/conversations/{conv.id}/update-title/',
            {'title': 'New Title'},
            format='json',
        )
        self.assertEqual(response.status_code, 200)
        conv.refresh_from_db()
        self.assertEqual(conv.title, 'New Title')

    def test_start_new_conversation(self):
        response = self.client.post('/api/conversations/new/')
        self.assertEqual(response.status_code, 201)
        self.assertIn('conversation_id', response.data)

    def test_unauthenticated_access_denied(self):
        self.client.force_authenticate(user=None)
        response = self.client.get('/api/conversations/')
        self.assertEqual(response.status_code, 401)
