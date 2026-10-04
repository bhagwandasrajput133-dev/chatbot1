import os
import cohere

client = cohere.Client(os.environ.get("COHERE_API_KEY"))

def generate_response(user_message: str) -> str: 
    try:
        response = client.chat(
            model="command-r-plus-08-2024",
            message=user_message
        )
        return response.text
    except Exception as e:
        return f"Error: Unable to connect to the language model. Details: {str(e)}"
