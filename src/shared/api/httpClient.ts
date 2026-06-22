const httpClient = {
    get: <T>(path: string) =>
        fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`)
            .then(res => {
                if (!res.ok) throw new Error(res.statusText);
                return res.json() as Promise<T>;
            }),

    post: <T>(path: string, body: unknown) =>
        fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }).then(res => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json() as Promise<T>;
        }),

    postVoid: (path: string, body: unknown) =>
        fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }).then(res => {
            if (!res.ok) throw new Error(res.statusText);
        }),
}

export default httpClient;