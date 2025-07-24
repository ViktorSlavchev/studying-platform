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