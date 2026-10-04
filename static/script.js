document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Add initial greeting
    addMessage('Bot', 'Hello! How can I help you today?');

    function createMessageElement(sender, text, isError = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        
        if (isError) {
            messageDiv.classList.add('error-message');
        } else if (sender === 'User') {
            messageDiv.classList.add('user-message');
        } else {
            messageDiv.classList.add('bot-message');
        }
        
        messageDiv.textContent = text;
        return messageDiv;
    }

    function addMessage(sender, text, isError = false) {
        const messageElement = createMessageElement(sender, text, isError);
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }

    function createTypingIndicator() {
        const indicatorDiv = document.createElement('div');
        indicatorDiv.classList.add('typing-indicator');
        indicatorDiv.id = 'typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            indicatorDiv.appendChild(dot);
        }
        
        return indicatorDiv;
    }

    function showTypingIndicator() {
        const indicator = createTypingIndicator();
        chatMessages.appendChild(indicator);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        // Display user message
        addMessage('User', text);
        userInput.value = '';
        userInput.focus();

        // Show typing indicator
        showTypingIndicator();

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: text })
            });

            removeTypingIndicator();

            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }

            const data = await response.json();
            addMessage('Bot', data.reply);
            
        } catch (error) {
            removeTypingIndicator();
            console.error('Error sending message:', error);
            addMessage('System', 'Error: Unable to reach the server. Please try again later.', true);
        }
    }

    sendBtn.addEventListener('click', sendMessage);

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
