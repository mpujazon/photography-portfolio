const httpClient = {
    get: <T>(path: string) => 
        fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`)
        .then(res => {
            if(!res.ok){
                throw new Error(res.statusText);
            };
            return res.json() as Promise<T>;
        })
}

export default httpClient;