import { API_URL } from "../../config.js";

export async function fetchQuotes() {
    try {
        const res = await fetch(`${API_URL}/quotes/game`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch quotes');
        }

        const data = await res.json();
        console.log(data.data.data)
        return data.data.data || [];
    } catch (error) {
        console.error('Error fetching quotes:', error);
        throw error;
    }
}


export async function saveScore({ score, correct }) {
    try {
        console.log('Saving score:', score, correct);
        const res = await fetch(`${API_URL}/quotes/save-score`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                score: score || 0,
                correct: correct || 0,
            })
        });

        if (!res.ok) {
            throw new Error('Failed to save score');
        }

        const data = await res.json();
        return data.data || {};
    } catch (error) {
        console.error('Error saving score:', error);
        throw error;
    }
}