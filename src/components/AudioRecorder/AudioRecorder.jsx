import React, { useState, useRef } from 'react';
import { assets } from '../../assets/assets';
import { transcribeAudio } from '../../config/deepgram';
import './AudioRecorder.css';

const AudioRecorder = ({ onTranscriptionComplete }) => {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            audioChunks.current = [];

            mediaRecorder.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.current.push(event.data);
                }
            };

            mediaRecorder.current.onstop = async () => {
                const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
                const transcription = await transcribeAudio(audioBlob);
                onTranscriptionComplete(transcription);
                
                // Clean up
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Error accessing microphone. Please make sure you have granted microphone permissions.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current && isRecording) {
            mediaRecorder.current.stop();
            setIsRecording(false);
        }
    };

    return (
        <div className="audio-recorder">
            <div className="recorder-container">
                <img
                    src={assets.mic_icon}
                    alt="microphone"
                    className={`mic-icon ${isRecording ? 'recording' : ''}`}
                    onClick={isRecording ? stopRecording : startRecording}
                />
                {isRecording && <span className="recording-text">Recording...</span>}
            </div>
        </div>
    );
};

export default AudioRecorder; 