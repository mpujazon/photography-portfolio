export interface ContactPayload {
    name: string;
    email: string;
    type: string;
    message: string;
}

export function sendContactEnquiry(payload: ContactPayload): Promise<void> {
    return fetch(`${import.meta.env.VITE_API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    }).then(res => {
        if (!res.ok) throw new Error(res.statusText);
    });
}
