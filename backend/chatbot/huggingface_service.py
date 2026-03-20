import requests
import re
import logging
import os
from dotenv import load_dotenv
load_dotenv()

logger = logging.getLogger(__name__)

# Hugging Face API token
HUGGING_FACE_API_TOKEN = os.getenv('HUGGING_FACE_TOKEN')
if HUGGING_FACE_API_TOKEN is None:
    raise ValueError("Hugging Face API token not found in environment variables")

# Model ID
# Make sure the model is hosted for the app to work as expected
MODEL_ID = "Biniyam/Llama-3-1-8B-AI-Doctors-Assistant"

# Hugging Face Inference API URL
API_URL = f"https://api-inference.huggingface.co/models/{MODEL_ID}"

# Headers for the request
headers = {
    "Authorization": f"Bearer {HUGGING_FACE_API_TOKEN}",
    "Content-Type": "application/json"
}


def extract_assistant_response(response_text):
    """Extract text after the assistant header from the LLM response."""
    match = re.search(r'<\|start_header_id\|>assistant<\|end_header_id\|>(.*?)$', response_text, re.DOTALL)
    if match:
        assistant_reply = match.group(1)
        assistant_reply = re.sub(r'<\|.*?\|>', '', assistant_reply).strip()
        words = assistant_reply.split()
        if len(words) > 1500:
            assistant_reply = ' '.join(words[:1500])
        return assistant_reply
    else:
        return "Error: Could not extract the assistant's response."


def query_huggingface(user_input, system_context, conversation_history=None, temperature=0.7, top_p=0.9):
    """Query Hugging Face API with per-request conversation history.

    Args:
        user_input: The user's message.
        system_context: System prompt for the LLM.
        conversation_history: List of prior message dicts (from the conversation record).
                              Each dict has 'role' ('user'/'assistant') and 'content'.
        temperature: Sampling temperature.
        top_p: Top-p sampling parameter.

    Returns:
        The assistant's reply string.
    """
    if conversation_history is None:
        conversation_history = []

    # Build recent context: last N exchanges from the stored conversation
    N = 3
    recent_history = conversation_history[-(N * 2):]

    # Construct the conversation turns in the prompt
    conversation = ""
    for turn in recent_history:
        role = turn.get("role", "user")
        content = turn.get("content", "")
        conversation += f"<|start_header_id|>{role}<|end_header_id|>\n{content}<|eot_id|>\n\n"

    # Add the current user input
    conversation += f"<|start_header_id|>user<|end_header_id|>\n{user_input}<|eot_id|>\n\n"

    # Build the full prompt
    prompt_template = f"""
<|start_header_id|>system<|end_header_id|>
{system_context}<|eot_id|>

{conversation}
<|start_header_id|>assistant<|end_header_id|>
"""

    data = {
        "inputs": prompt_template.strip(),
        "parameters": {
            "temperature": temperature,
            "top_p": top_p,
            "max_new_tokens": 1500,
            "stop": ["<|endoftext|>", "<|eot_id|>", "<|start_header_id|>"]
        }
    }

    try:
        response = requests.post(API_URL, headers=headers, json=data)

        if response.status_code == 200:
            result = response.json()
            if isinstance(result, list) and len(result) > 0:
                raw_response = result[0].get("generated_text", "")
            else:
                raw_response = result.get("generated_text", "")

            assistant_reply = extract_assistant_response(raw_response)
            return assistant_reply
        else:
            logger.error(f"Hugging Face API error: {response.status_code}, {response.text}")
            return f"Error: Unable to get a valid response (status code: {response.status_code})"

    except requests.exceptions.RequestException as e:
        logger.error(f"Request to Hugging Face API failed: {str(e)}")
        return "Error: Failed to connect to the Hugging Face API."
