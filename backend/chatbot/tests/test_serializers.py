from django.test import TestCase
from chatbot.serializers import RegisterSerializer, LoginSerializer, MessageSerializer
from chatbot.models import MyUser, Message


class RegisterSerializerTest(TestCase):
    def test_valid_registration(self):
        data = {
            'email': 'test@example.com',
            'first_name': 'Test',
            'last_name': 'User',
            'phone_number': '1234567890',
            'password': 'StrongPass123!',
            'password2': 'StrongPass123!',
        }
        serializer = RegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_password_mismatch(self):
        data = {
            'email': 'test@example.com',
            'first_name': 'Test',
            'last_name': 'User',
            'phone_number': '1234567890',
            'password': 'StrongPass123!',
            'password2': 'DifferentPass456!',
        }
        serializer = RegisterSerializer(data=data)
        self.assertFalse(serializer.is_valid())

    def test_missing_email(self):
        data = {
            'first_name': 'Test',
            'last_name': 'User',
            'phone_number': '1234567890',
            'password': 'StrongPass123!',
            'password2': 'StrongPass123!',
        }
        serializer = RegisterSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors)


class LoginSerializerTest(TestCase):
    def setUp(self):
        self.user = MyUser.objects.create_user(
            email='login@example.com',
            password='StrongPass123!',
            first_name='Test',
            last_name='User',
            phone_number='1234567890',
        )

    def test_valid_login(self):
        data = {'email': 'login@example.com', 'password': 'StrongPass123!'}
        serializer = LoginSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertEqual(serializer.validated_data['user'], self.user)

    def test_invalid_password(self):
        data = {'email': 'login@example.com', 'password': 'WrongPass'}
        serializer = LoginSerializer(data=data)
        self.assertFalse(serializer.is_valid())


class MessageSerializerTest(TestCase):
    def setUp(self):
        self.user = MyUser.objects.create_user(
            email='msg@example.com',
            password='StrongPass123!',
            first_name='Test',
            last_name='User',
            phone_number='1234567890',
        )

    def test_serialize_conversation(self):
        msg = Message.objects.create(
            user=self.user,
            title='Test Conversation',
            conversation=[
                {'role': 'user', 'content': 'Hello'},
                {'role': 'assistant', 'content': 'Hi there!'},
            ]
        )
        serializer = MessageSerializer(msg)
        data = serializer.data
        self.assertEqual(data['title'], 'Test Conversation')
        self.assertEqual(len(data['conversation']), 2)
