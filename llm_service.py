import os
from google import genai

# The SDK automatically picks up the GEMINI_API_KEY environment variable
client = genai.Client()

def generate_response(user_message: str) -> str: 
    try:
        response = client.models.generate_content(
            model="gemini-3.8-flash",
            contents=user_message
        )
        return response.text
    except Exception as e:
        return f"Error: Unable to connect to the language model. Details: {str(e)}"
