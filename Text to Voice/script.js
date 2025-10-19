// Create a new SpeechSynthesisUtterance object to hold the speech configuration
let speech = new SpeechSynthesisUtterance();

// Array to store available voices from the browser's speech synthesis
let voices = [];

// Get reference to the voice/language select dropdown
let voiceSelect = document.querySelector("select");

// Event listener for when voices are loaded (fires asynchronously in some browsers)
window.speechSynthesis.onvoiceschanged = () => {
    // Fetch all available voices
    voices = window.speechSynthesis.getVoices();
    
    // Set the default voice to the first available one
    if (voices.length > 0) {
        speech.voice = voices[0];
    }
    
    // Clear existing options and populate the select with voice names
    // Note: This overwrites any hardcoded options; each option's value is its index in the voices array
    voiceSelect.innerHTML = '';  // Clear hardcoded options to avoid conflicts
    voices.forEach((voice, i) => {
        const option = new Option(voice.name, i);  // Fixed: 'Option' not 'Options'
        voiceSelect.options.add(option);
    });
    
    // Manually trigger if voices are already loaded (for browsers where onvoiceschanged doesn't fire initially)
    if (voices.length === 0) {
        voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            speech.voice = voices[0];
            voiceSelect.innerHTML = '';
            voices.forEach((voice, i) => {
                const option = new Option(voice.name, i);
                voiceSelect.options.add(option);
            });
        }
    }
};

// Event listener for when user changes voice selection
voiceSelect.addEventListener("change", () => {
    // Set the selected voice based on the option's value (which is the index)
    if (voices[voiceSelect.value]) {
        speech.voice = voices[voiceSelect.value];
    }
});

// Event listener for the Listen button click
// Fixed: Removed comma after querySelector, added ID selector for precision
document.querySelector("#listen-btn").addEventListener("click", () => {
    // Get text from textarea
    const text = document.querySelector("#input-text").value;
    
    // Only speak if text is not empty
    if (text.trim() !== '') {
        speech.text = text;
        window.speechSynthesis.speak(speech);
    } else {
        // Optional: Alert or handle empty input (e.g., placeholder reminder)
        console.log("Please enter some text to speak!");
    }
});

// Initial load: Force load voices in case onvoiceschanged doesn't trigger immediately
window.addEventListener('load', () => {
    window.speechSynthesis.getVoices();  // Prime the pump
});