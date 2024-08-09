import { BASE_API } from "../utils/constants";

export async function getSourceFoldersApi(token) {
    try {
        const url = `${BASE_API}/api/v1/folder/`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        throw error;
    }
}

export async function addSourceFoldersApi(data, token) {
    try {
        const url = `${BASE_API}/api/v1/folder/`;
        const params = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, params)
        return await response.json()
    } catch (error) {
        throw error;
    }
}

export async function updateSourceFoldersApi(id, data, token) {
    try {
        const url = `${BASE_API}/api/v1/folder/${id}/`;
        const params = {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, params)
        return await response.json()
    } catch (error) {
        throw error;
    }
}

export async function deleteFolderApi(token, id) {
    try {
        const url = `${BASE_API}/api/v1/folder/${id}/`;
        const params = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, params)
        return await response.json()
    } catch (error) {
        throw error;
    }
}