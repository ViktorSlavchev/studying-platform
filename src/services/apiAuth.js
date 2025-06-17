import { API_URL } from "../../config.js";

export async function login({ email, password }) {
    const res = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });


    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Login failed');
    }

    return data.data.user;
}


export async function getCurrentUser() {
    const res = await fetch(`${API_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.status === 401) {
        // Not authenticated
        return null;
    }

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch current user');
    }

    return data.data.user;
}

export async function logout() {
    const res = await fetch(`${API_URL}/users/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error('Logout failed');
    }

    return true;
}
