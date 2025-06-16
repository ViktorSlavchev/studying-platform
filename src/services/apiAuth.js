export async function login({ email, password }) {
    const res = await fetch('http://127.0.0.1:3000/api/v1/users/login', {
        method: 'POST',
        credentials: 'include', // ⬅️ Important for cookies!
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Login failed');
    }

    return data.data.user; // or return data if you want token too
}
