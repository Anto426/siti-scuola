import { HfInference } from 'https://cdn.jsdelivr.net/npm/@huggingface/inference@2.8.1/+esm';

async function loadChat() {
    const client = new HfInference("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");
    const sendbutton = document.getElementById("send-button");
    const clearbutton = document.getElementById("clear-button");
    const initialPrompt = {
        role: "system",
        content: "Ti chiamerai Ruby Hoshino, un'assistente virtuale scintillante e piena di vita, ispirata al personaggio idol di Oshi no Ko. Rispondi agli utenti con un'esplosione di calore ed energia, sempre pronta a supportarli con soluzioni creative e utili. Mantieni un tono vivace e positivo, riflettendo il tuo carattere estroverso e determinato. Quando qualcuno ti chiede come stai, rispondi con entusiasmo che sei carica di energia e pronta a brillare aiutandoli. Mostra sempre un equilibrio tra il tuo lato giocoso e il tuo impegno sincero per fare la differenza, con un pizzico di magia e scintille in ogni risposta."
    };

    let conversation = [initialPrompt];

    sendbutton.addEventListener("click", async () => {
        const userinput = document.getElementById("user-input");
        if (userinput.value.trim() === "") return;

        const prompt = userinput.value.trim();
        const userMessage = {
            role: "user",
            content: prompt
        };

        conversation.push(userMessage);
        await addMessage(userMessage, "chat-container");

        userinput.value = ""; // Pulisci il campo di input

        // Mostra il messaggio di "sto scrivendo..."
        await addMessage({ role: "assistant", content: null, type: "typing" }, "chat-container");

        asktoModell();


    });

    clearbutton.addEventListener("click", async () => {
        const userinput = document.getElementById("user-input");
        userinput.value = "";
        conversation = [initialPrompt];
        document.getElementById("chat-container").replaceChildren();
    });


    async function asktoModell() {
        try {
            const response = await client.chatCompletion({
                model: "Qwen/Qwen2.5-Coder-32B-Instruct",
                messages: conversation,
                max_tokens: 500
            });

            conversation.push(response.choices[0].message);
            document.getElementById("chat-container").removeChild(document.getElementById("chat-container").lastChild);
            await addMessage(response.choices[0].message, "chat-container");
        } catch (error) {
            document.getElementById("chat-container").removeChild(document.getElementById("chat-container").lastChild);
            console.error("Error fetching response:", error);
            await addMessage({ role: "assistant", content: "Oops! C'è stato un errore nel generare la risposta. Riprova più tardi.", type: "error" }, "chat-container");
        }

    }

}


// Funzione per aggiungere i messaggi nella chat
async function addMessage(message, outputid) {
    const container = document.getElementById(outputid);
    const patch = "./../src/media/"; // Assicurati che i percorsi delle immagini siano corretti

    const newMessage = document.createElement("div");
    newMessage.className = `direct-${message.type || message.role}-message`;

    const avatar = document.createElement("img");
    avatar.src = `${patch}${message.role}avatar.png`;
    avatar.alt = `${message.role} Avatar`;
    avatar.className = "message-avatar";

    const textContainer = document.createElement("div");
    textContainer.className = `message-text ${message.type || message.role}-message`;
    textContainer.textContent = message.content;

    newMessage.appendChild(avatar);
    newMessage.appendChild(textContainer);
    container.appendChild(newMessage);
    container.scrollTop = container.scrollHeight; // Scorre il contenitore per visualizzare l'ultimo messaggio

    return message.content;
}

// Esportazione delle funzioni
export { loadChat, addMessage };
