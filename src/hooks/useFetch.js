import { useState, useEffect } from "react"

export const useFetch = (url) => {
    const [data, setData] = useState(null);

    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(false);

    const [method, setMethod] = useState(null);

    const [callFetch, setCallFetch] = useState(null);

    const [config, setConfig] = useState(null);

    const httpConfig = (data, method) => {
        if (method === 'POST'){
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })}
        setMethod(method);
    }

    useEffect(() => {
        const fetchData = async () => {

            setLoading(true);

            try { 
                const res = await fetch(url);
    
                const json = await res.json();
    
                setData(json);
                
            } catch(e) {
                console.log(e.message);
                setError("Conteceu um erro");
            }
            setLoading(false);
        }
        fetchData();

    }, [url, callFetch])

    useEffect(() => {
        if(method === 'POST'){
            const httpRequest = async () => {
                const fetchOptions = [url, config];
                const res = await fetch (...fetchOptions);
                const json = await res.json();
                setCallFetch(json);
            }

            httpRequest();
        }
    }, [method, config, url])

    return { data, error, loading, httpConfig }
}