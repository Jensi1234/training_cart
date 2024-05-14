import { useEffect, useState } from "react";

const useFetchData = (fetchFunction, params) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                const response = await fetchFunction(params);
                setData(response);
            } catch (error) {
                setError(error.message || 'Error in fetching data');
            }
        }

        fetchData();
        setLoading(false)
    }, [fetchFunction, params]);

    return { loading, error, data }
}

export default useFetchData;