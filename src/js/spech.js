import { addMessage } from './chat.js';

function startSpeechRecognition() {
    const startButton = document.getElementById('start-button');
    const microphone = document.getElementById('microphoneanimation');
    const microphonestatus = document.getElementById('microphone-status');

    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        microphonestatus.textContent = 'Speech Recognition not supported in this browser.';
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'it-IT';
    recognition.continuous = false;
    recognition.interimResults = false;

    startButton.addEventListener('click', () => {
        recognition.start();
        microphone.classList.remove('off', 'error');
        microphone.classList.add('on');
        microphonestatus.textContent = 'Listening...';
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        microphone.classList.remove('on', 'error');
        microphone.classList.add('off');
        microphonestatus.textContent = 'Mutato';

        addMessage({ role: 'user', content: transcript }, 'transition-container');
    };

    recognition.onerror = (event) => {
        microphone.classList.remove('on', 'off');
        microphone.classList.add('error');
        microphonestatus.textContent = `Error: ${event.error}`;
    };
}

export { startSpeechRecognition };

