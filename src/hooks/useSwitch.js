import {addUserApi, getMeApi, updateUserApi} from "../api/user";
import {useState} from "react";
import {useAuth} from "./useAuth";
import {addSwitchApi, deleteSwitchApi, getSwitchesApi, updateSwitchApi} from "../api/switches";

export function useSwitch() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [switches, setSwitches] = useState(null);
    const {auth} = useAuth();
    const getMe = async (token) => {
        try {
            return await getMeApi(token)
        } catch (error) {
            throw error
        }
    };
    const getSwitches = async () => {
        try {
            setLoading(true)
            const response = await getSwitchesApi(auth.token)
            setLoading(false)
            setSwitches(response)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }
    const addSwitch = async (data) => {
        try {
            setLoading(true);
            await addSwitchApi(data, auth.token)
            setLoading(false)
        } catch (error){
            setLoading(false);
            setError(error)
        }
    }
    const updateSwitch = async (id, data) => {
        try {
            setLoading(true);
            await updateSwitchApi(id, data, auth.token)
            setLoading(false)
        } catch (error){
            setLoading(false);
            setError(error)
        }
    }
    const deleteSwitch = async (id) => {
        try {
            setLoading(true);
            await deleteSwitchApi(id, auth.token)
            setLoading(false)
        } catch (error){
            setLoading(false);
            setError(error)
        }
    }
    return {
        loading,
        error,
        switches,
        getMe,
        getSwitches,
        addSwitch,
        updateSwitch,
        deleteSwitch
    }
}