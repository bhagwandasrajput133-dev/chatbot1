def generate_response(user_message: str) -> str: 
    """ Generates a response for the user's message.
    Currently, this is a simple echo function.
    In the future, this can be swapped out to call a real LLM API like Gemini. """ 
    return f"Bot: I received your message - {user_message}"
