import { useState } from "react";
import {useAuth} from '.'
import { getSourceFoldersApi, addSourceFoldersApi, deleteFolderApi, updateSourceFoldersApi } from "../api/source_folder";

export function useSourceFolder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sourceFolders, setSourceFolders] = useState(null);
    const { auth } = useAuth()

    const getAllSourceFolders = async () => {
        try {
            setLoading(true)
            const response = await getSourceFoldersApi(auth.token);
            console.log(response)
            setLoading(false)
            setSourceFolders(response)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }
    
    const addSourceFolder = async (data) => {
        try {
            setLoading(true)
            await addSourceFoldersApi(data, auth.token);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const deleteFolder = async (folder_id) => {
        try {
            setLoading(true)
            await deleteFolderApi(auth.token, folder_id);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const updateSourceFolder = async (folder_id, data) => {
                try {
            setLoading(true)
            await updateSourceFoldersApi(folder_id, data, auth.token);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }
    
    return {
        loading,
        error,
        sourceFolders,
        getAllSourceFolders,
        addSourceFolder,
        deleteFolder,
        updateSourceFolder,
    }
}