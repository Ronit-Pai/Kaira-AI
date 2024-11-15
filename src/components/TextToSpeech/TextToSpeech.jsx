import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import './TextToSpeech.css';

const TextToSpeech = ({ text }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState([]);

    useEffect(() => {
        const loadVoices = () => {
            setVoices(window.speechSynthesis.getVoices());
        };

        loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    const speak = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            
            const femaleVoice = voices.find(voice => 
                voice.name.includes('female') || 
                voice.name.includes('Female') || 
                voice.name.includes('woman') ||
                voice.name.includes('Girl')
            );

            if (femaleVoice) {
                utterance.voice = femaleVoice;
            }

            utterance.pitch = 1.0;
            utterance.rate = 1.0;

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => {
                setIsSpeaking(false);
                alert('Error occurred while speaking');
            };

            window.speechSynthesis.speak(utterance);
        } else {
            alert('Text-to-speech is not supported in your browser');
        }
    };

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    return (
        <div className="text-to-speech">
            <img
                src={assets.speaker_icon}
                alt={isSpeaking ? "Stop speaking" : "Speak text"}
                className={`speak-icon ${isSpeaking ? 'speaking' : ''}`}
                onClick={isSpeaking ? stopSpeaking : speak}
                title={isSpeaking ? "Stop speaking" : "Speak text"}
            />
        </div>
    );
};

export default TextToSpeech; 