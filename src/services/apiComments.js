import { API_URL } from "../../config.js";

export async function fetchComments() {
    try {
        const response = await fetch(`${API_URL}/comments/my-comments`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        const body = await response.json();
        if (!response.ok) {
            throw new Error(body.message || `Error fetching comments (${response.status})`);
        }
        return body.data.comments || [];
    } catch (error) {
        console.error("Failed to fetch comments:", error.message);
        throw error;
    }
}


// commentInfo {quote, text, comment}
export async function gradeComment(commentInfo) {
    try {
        const response = await fetch(`${API_URL}/comments/grade`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(commentInfo),
        });

        const body = await response.json();

        if (!response.ok) {
            throw new Error(body.message || `Error grading comment (${response.status})`);
        }

        return body.data.comment || null;
    } catch (error) {
        console.error("Failed to grade comment:", error.message);
        throw error;
    }
}