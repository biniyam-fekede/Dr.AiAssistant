from django.test import TestCase
from unittest.mock import patch, MagicMock
from chatbot.huggingface_service import extract_assistant_response, query_huggingface


class ExtractAssistantResponseTest(TestCase):
    def test_extracts_response_correctly(self):
        raw = "<|start_header_id|>assistant<|end_header_id|>Here is my advice.<|eot_id|>"
        result = extract_assistant_response(raw)
        self.assertEqual(result, "Here is my advice.")

    def test_strips_special_tokens(self):
        raw = "<|start_header_id|>assistant<|end_header_id|>Hello <|some_token|> world"
        result = extract_assistant_response(raw)
        self.assertEqual(result, "Hello  world")

    def test_no_assistant_header_returns_error(self):
        raw = "Some random text without assistant header"
        result = extract_assistant_response(raw)
        self.assertIn("Error", result)

    def test_truncates_long_response(self):
        long_text = " ".join(["word"] * 2000)
        raw = f"<|start_header_id|>assistant<|end_header_id|>{long_text}"
        result = extract_assistant_response(raw)
        words = result.split()
        self.assertLessEqual(len(words), 1500)


class QueryHuggingfaceTest(TestCase):
    @patch('chatbot.huggingface_service.requests.post')
    def test_successful_query(self, mock_post):
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = [
            {"generated_text": "<|start_header_id|>assistant<|end_header_id|>Take rest and hydrate."}
        ]
        mock_post.return_value = mock_response

        result = query_huggingface("I have a headache", "You are a doctor assistant.")
        self.assertEqual(result, "Take rest and hydrate.")

    @patch('chatbot.huggingface_service.requests.post')
    def test_passes_conversation_history(self, mock_post):
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = [
            {"generated_text": "<|start_header_id|>assistant<|end_header_id|>Follow-up advice."}
        ]
        mock_post.return_value = mock_response

        history = [
            {"role": "user", "content": "Hello"},
            {"role": "assistant", "content": "Hi! How can I help?"},
        ]
        result = query_huggingface("What about fever?", "System prompt", conversation_history=history)
        self.assertEqual(result, "Follow-up advice.")

        # Verify history was included in the prompt
        call_args = mock_post.call_args
        prompt = call_args[1]['json']['inputs']
        self.assertIn("Hello", prompt)
        self.assertIn("Hi! How can I help?", prompt)

    @patch('chatbot.huggingface_service.requests.post')
    def test_api_error_returns_error_message(self, mock_post):
        mock_response = MagicMock()
        mock_response.status_code = 500
        mock_response.text = "Internal Server Error"
        mock_post.return_value = mock_response

        result = query_huggingface("test", "system")
        self.assertIn("Error", result)

    @patch('chatbot.huggingface_service.requests.post')
    def test_connection_error_returns_error(self, mock_post):
        import requests
        mock_post.side_effect = requests.exceptions.ConnectionError("Connection failed")

        result = query_huggingface("test", "system")
        self.assertIn("Error", result)
