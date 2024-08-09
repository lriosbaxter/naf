import {getMeApi} from "../api/user";
import {useState} from "react";
import {useAuth} from "./useAuth";
import {addRouterApi, deleteRouterApi, getRoutersApi, updateRouterApi} from "../api/routers";

export function useRouter() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [routers, setRouters] = useState(null);
    const {auth} = useAuth();
    const getMe = async (token) => {
        try {
            return await getMeApi(token)
        } catch (error) {
            throw error
        }
    };
    const getRouters = async () => {
        try {
            setLoading(true)
            const response = await getRoutersApi(auth.token)
            setLoading(false)
            setRouters(response)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }
    const addRouter = async (data) => {
        try {
            setLoading(true);
            await addRouterApi(data, auth.token)
            setLoading(false)
        } catch (error){
            setLoading(false);
            setError(error)
        }
    }
    const updateRouter = async (id, data) => {
        try {
            setLoading(true);
            await updateRouterApi(id, data, auth.token)
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    }
    const deleteRouter = async (id) => {
        try {
            setLoading(true);
            await deleteRouterApi(id, auth.token)
            setLoading(false)
        } catch (error){
            setLoading(false);
            setError(error)
        }
    }
    return {
        loading,
        error,
        routers,
        getMe,
        getRouters,
        addRouter,
        updateRouter,
        deleteRouter
    }
}