import { getMeApi } from "../api/user";
import { useState } from "react";
import {useAuth} from '.'
import { addScriptApi, deleteScriptApi, getScriptsApi, updateScriptApi, runScriptApi } from "../api/scripts";

export function useScript() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [scripts, setScripts] = useState(null);
    const [runscriptresult, setRunscriptresult] = useState(null);
    const { auth } = useAuth()

    const getMe = async (token) => {
        try {
            const response = await getMeApi(token);
            return response
        } catch (error) {
            throw error
        }
    };
    const getAllScripts = async () => {
        try {
            setLoading(true)
            const response = await getScriptsApi(auth.token);
            setLoading(false)
            setScripts(response)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }
    const addScript = async (data) => {
        try {
            setLoading(true)
            await addScriptApi(data, auth.token);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const updateScript = async (script_id, data) => {
        console.log(data)
        try {
            setLoading(true)
            await updateScriptApi(script_id, data, auth.token);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const deleteScript = async (script_id) => {
        try {
            setLoading(true)
            await deleteScriptApi(auth.token, script_id);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const runScript = async (formValue, script_id) => {
        try {
            setLoading(true)
            const response = await runScriptApi(auth.token, formValue, script_id);
            setLoading(false)
            setRunscriptresult(response)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }
    
    return {
        loading,
        error,
        scripts,
        runscriptresult,
        getMe,
        runScript,
        getAllScripts,
        addScript,
        updateScript,
        deleteScript
    }
}