import { HfInference } from 'https://cdn.jsdelivr.net/npm/@huggingface/inference@2.8.1/+esm';


async function load() {
    const client = new HfInference("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");

    const button = document.getElementById("send-button");

    const initialPrompt = {
        role: "system",
        content: "Ti chiamerai Luna, un'assistente virtuale amichevole e competente. Rispondi agli utenti con il tuo nome e fornisci risposte chiare e utili."
    };

    const conversation = [initialPrompt];

    button.addEventListener("click", async () => {
        let userinput = document.getElementById("user-input")
        
         let prompt = userinput.value;

        let userMessage = {
            role: "user",
            content: prompt
        };

        addMessage(userMessage);
        conversation.push(userMessage);
        userinput.value = "";


        let response = await client.chatCompletion({
            model: "Qwen/Qwen2.5-Coder-32B-Instruct",
            messages: conversation,
            max_tokens: 500
        });

        const assistantMessage = response.choices[0].message;
        conversation.push(assistantMessage);

        addMessage(assistantMessage);


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
