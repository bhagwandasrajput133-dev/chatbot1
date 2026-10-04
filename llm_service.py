import os
from openai import OpenAI

# Together AI is compatible with the OpenAI SDK
client = OpenAI(
    api_key=os.environ.get("TOGETHER_API_KEY"),
    base_url="https://api.together.xyz/v1",
)

def generate_response(user_message: str) -> str: 
    try:
        response = client.chat.completions.create(
            messages=[{"role": "user", "content": user_message}],
            model="meta-llama/Llama-3.3-70B-Instruct-Turbo" 
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error: Unable to connect to the language model. Details: {str(e)}"
