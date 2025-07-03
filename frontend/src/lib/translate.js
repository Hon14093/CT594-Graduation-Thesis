// lib/translate.js
import axios from 'axios';

const LIBRE_HOST = 'https://libretranslate.com'; // Or use public instance: https://libretranslate.com

export async function translateToVietnamese(text) {
    try {
        const response = await axios.post(`${LIBRE_HOST}/translate`, {
            q: text,
            source: 'en',
            target: 'vi',
            format: 'text'
        });
        return response.data.translatedText;
    } catch (error) {
        console.error('Translation failed:', error);
        return text; // Fallback to original
    }
}