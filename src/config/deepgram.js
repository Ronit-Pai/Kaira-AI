import { Deepgram } from '@deepgram/sdk';

const DEEPGRAM_API_KEY = '49039e9b153a47de6b8f92fb9b9bb23e7e6a9227';

export const transcribeAudio = async (audioBlob) => {
    try {
        const response = await fetch('https://api.deepgram.com/v1/listen', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${DEEPGRAM_API_KEY}`,
                'Content-Type': audioBlob.type
            },
            body: audioBlob
        });

        const data = await response.json();
        return data.results?.channels[0]?.alternatives[0]?.transcript || '';
    } catch (error) {
        console.error('Error transcribing audio:', error);
        return '';
    }
}; 