from fastapi import FastAPI 
from fastapi.staticfiles import StaticFiles 
from fastapi.responses import FileResponse 
from pydantic import BaseModel 
from llm_service import generate_response

app = FastAPI(title="Chatbot API")

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static") 

class ChatRequest(BaseModel):
    message: str 

class ChatResponse(BaseModel):
    reply: str

@app.get("/") 
async def read_index(): 
    return FileResponse("index.html")

@app.post("/chat", response_model=ChatResponse) 
async def chat_endpoint(request: ChatRequest):
    # Process the message through our modular service
    reply = generate_response(request.message) 
    return ChatResponse(reply=reply)
