import {getMeApi} from "../api/user";
import {useState} from "react";
import {useAuth} from "./useAuth";
import {
    addSiteApi,
    deleteSiteApi,
    getAllDevicesFromSite,
    getSitesApi,
    retrieveSiteApi,
    updateSiteApi
} from "../api/sites";
import {retriveAllDevicesApi} from "../api/connections";

export function useSite() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sites, setSites] = useState(null);
    const [site, setRetrieved] = useState(null);
    const [devices, setAllDevices] = useState(null);
    const {auth} = useAuth();
    const getMe = async (token) => {
        try {
            return await getMeApi(token)
        } catch (error) {
            throw error
        }
    };
    const getSites = async () => {
        try {
            setLoading(true)
            const response = await getSitesApi(auth.token)
            setLoading(false)
            setSites(response)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }
    const addSite = async (data) => {
        try {
            setLoading(true);
            await addSiteApi(data, auth.token)
            setLoading(false)
        } catch (error){
            setLoading(false);
            setError(error)
        }
    }
    const updateSite = async (id, data) => {
        try {
            setLoading(true);
            await updateSiteApi(id, data, auth.token)
            setLoading(false)
        } catch (error){
            setLoading(false);
            setError(error)
        }
    }
    const deleteSite = async (id) => {
        try {
            setLoading(true);
            await deleteSiteApi(id, auth.token)
            setLoading(false)
        } catch (error){
            setLoading(false);
            setError(error)
        }
    }
    const retrieveSite = async (id) => {
        try {
            setLoading(true);
            const response = await retrieveSiteApi(id, auth.token)
            setLoading(false)
            setRetrieved(response)
        } catch (error){
            setLoading(false);
            setError(error)
        }
    }
    const retrieveAllDevices = async () => {
        try {
            setLoading(true);
            const response = await retriveAllDevicesApi(auth.token)
            setLoading(false)
            setAllDevices(response)
        } catch (error){
            setLoading(false);
            setError(error)
        }
    }

    return {
        loading,
        error,
        site,
        sites,
        devices,
        getMe,
        getSites,
        retrieveSite,
        retrieveAllDevices,
        addSite,
        updateSite,
        deleteSite
    }
}