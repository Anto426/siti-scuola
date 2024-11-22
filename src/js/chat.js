
import { HfInference } from 'https://cdn.jsdelivr.net/npm/@huggingface/inference@2.8.1/+esm';


async function load() {

    const client = new HfInference("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");

    const button = document.getElementById("send-button");


    button.addEventListener("click", async () => {

        let prompt = document.getElementById("user-input").value;



        let message = {
            model: "Qwen/Qwen2.5-Coder-32B-Instruct",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 500
        };

        addMessage(message.messages[0]);

        let response = await client.chatCompletion(message);

        addMessage(response.choices[0].message);


    });

    function addMessage(message) {
        console.log(message);
        let className = message.role === "user" ? "users-message" : "assistant-message";
        let container = document.getElementById("chat-container");
        let newMessage = document.createElement("div");
        newMessage.className = className;
        let avatar = document.createElement("img");
        avatar.src = message.role === "user" ? "./../src/media/useravatar.png" : "./../src/media/assistantavatar.png";
        avatar.alt = message.role === "user" ? "User Avatar" : "Assistant Avatar";
        avatar.className = "message-avatar";
        let textContainer = document.createElement("div");
        textContainer.className = "message-text";
        textContainer.textContent = message.content;
        newMessage.appendChild(avatar);
        newMessage.appendChild(textContainer);
        container.appendChild(newMessage);
        container.scrollTop = container.scrollHeight;
    }


}


export { load };
