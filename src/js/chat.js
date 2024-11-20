const apiKey = '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';
const model = 'meta-llama/Llama-3.2-1B';

function load() {
    document.getElementById('send-button').addEventListener('click', async () => {

        prompt = `
        Rispondi in italiano in modo chiaro e dettagliato. Se la domanda riguarda un argomento tecnico, spiega i concetti in modo semplice ma completo. Evita risposte troppo brevi e cerca di fornire esempi pratici se possibile.
        
        Domanda: ${document.getElementById('user-input').value}
        `;

        const response = await fetch('https://api-inference.huggingface.co/models/' + model, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: prompt,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Errore:', error);
            document.getElementById('generatedText').innerText = 'Errore nella generazione del testo';
        } else {
            const result = await response.json();
            const generatedText = result[0].generated_text;
            const indiceRisposta = result.indexOf("Risposta:");
    
            if (indiceRisposta === -1) {
                return 'Nessuna risposta trovata';
            }
        
            const risposta = result.slice(indiceRisposta + 9).trim(); 
            
            console.log(risposta);
        }
    });
}

