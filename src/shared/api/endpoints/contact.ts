import httpClient from "../httpClient";

export interface ContactPayload {
    name: string;
    email: string;
    type: string;
    message: string;
}

export function sendContactEnquiry(payload: ContactPayload): Promise<void> {
    return httpClient.postVoid("/contact", payload);
}
