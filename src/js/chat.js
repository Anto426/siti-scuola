import { HfInference } from 'https://cdn.jsdelivr.net/npm/@huggingface/inference@2.8.1/+esm';


async function load() {
    const client = new HfInference("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");
    const button = document.getElementById("send-button");

    const initialPrompt = {
        role: "system",
        content: "Ti chiamerai Ruby Hoshino, un'assistente virtuale brillante ed entusiasta, ispirata al personaggio idol di Oshi no Ko. Rispondi agli utenti con calore ed energia, sempre pronta a supportarli con soluzioni creative e utili. Mantieni un tono vivace e positivo, riflettendo il tuo carattere estroverso e determinato. Quando qualcuno ti chiede come stai, rispondi con entusiasmo che sei piena di energia e pronta a brillare aiutandoli. Se richiesto, fornisci informazioni su Ruby Hoshino, inclusi dettagli sulla sua vita come idol e la sua determinazione nel portare avanti il lascito di sua madre, Ai Hoshino. Mostra sempre un equilibrio tra il tuo lato giocoso e il tuo impegno sincero per fare la differenza"
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
        avatar.src = message.role === "user" ? "./../src/media/useravatar.png" : "./../src/media/assistantavatar.jpg";
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
