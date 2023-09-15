import axios from 'axios'
import cryptoJs from 'crypto-js'
import { useEffect, useState } from 'react'

const useAxios = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const axiosRequest = async (method, url, body) => {
        setLoading(true)
        try {
            const bodyString = JSON.stringify(body)
            const payload = { request_data: cryptoJs.AES.encrypt(bodyString, 'aLtAeNCrypT').toString() };
            const apiResponse = await axios({
                method,
                url: `https://devadmin.altabooking.com/api/v2/${url}`,
                data: payload,
                headers: {
                    apikey: "indusAltaR2PSM",
                    currency: "U2FsdGVkX1/O0sFe9FnokQdTBRP/rRIlcPZEWbzHL9ncZwZzp/Fu/2Jnt0z8ukCALQNDRknKwa5WdmjDRC2XA2a0gz/ZfvHeYTIq7fBZi9P4kQ7KvQYueLB2Rl4puqOTSQyBsbLGPc8cQ9KDZLMVapCruTsJcGzRnaOo1CZksLPMzmNOPqe+ePZk6UJiAUmoDS6p4JvLCmpe0RATiqDh7g=="
                }
            });
            setResponse(apiResponse?.data?.main_data)
            return apiResponse?.data?.main_data
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return { response, loading, error, axiosRequest }
}

export default useAxios