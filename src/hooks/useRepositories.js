import { useState } from "react";
import {useAuth} from '.'
import { getSourceCodeApi } from "../api/repositories";

export function useRepositories() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sourceCode, setSourceCode] = useState(null);
    const { auth } = useAuth()

    const getSourceCode = async (data) => {
        try {
            setLoading(true)
            const response = await getSourceCodeApi(auth.token, data);
            console.log(response)
            setLoading(false)
            setSourceCode(response)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    return {
        loading,
        error,
        sourceCode,
        getSourceCode
    }
}