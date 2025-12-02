import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'

const useFetch = (url, method = "GET", options = {}) => {
    const [data, setdata] = useState(null);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(null);
    const [refreshIndex, setrefreshIndex] = useState(0);
    const optionsString = JSON.stringify(options);
    const requestOptions = useMemo(() => {
        const opt = { ...options };
        if (method == "POST" && !opt.data) {
            opt.data = {};
        }
        return opt;
    }, [method, optionsString])
    useEffect(() => {
        const apiCall = async () => {
            setloading(true);
            seterror(null);
            try {
                const { data: res } = await axios({
                    url,
                    method,
                    ...(requestOptions)
                })
                if (!res.success) {
                    throw new Error(res.message)
                }
                setdata(res);
            } catch (error) {
                seterror(error.message);
            } finally {
                setloading(false);
            }

        }
        apiCall();
    }, [url, refreshIndex, requestOptions])
    const refetch = () => {
        setrefreshIndex(pre => pre + 1)
    }
    return { data, loading, error, refetch };
}
export default useFetch
