import { useState, useEffect } from "react";
import axios from "axios";

function useUnsplash(params) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    axios.defaults.baseURL = "https://api.unsplash.com";

    const getData = async (url) => {
        try {
            setLoading(true);
            const response = await axios(url);
            setData(response.data.results);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData(params);
    }, [params]);

    return { data, loading, error, getData: (url) => getData(url) };
}

export default useUnsplash;
