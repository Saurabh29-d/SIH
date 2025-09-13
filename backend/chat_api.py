from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Define request format
class ChatRequest(BaseModel):
    message: str

# Define response format
class ChatResponse(BaseModel):
    reply: str

@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    user_message = request.message

    # Simple chatbot logic (replace with AI model later if needed)
    if "hello" in user_message.lower():
        bot_reply = "Hi there! How can I help you today?"
    elif "bye" in user_message.lower():
        bot_reply = "Goodbye! Have a great day 😊"
    else:
        bot_reply = "I'm just a simple bot. Try saying 'hello' or 'bye'."

    return ChatResponse(reply=bot_reply)
