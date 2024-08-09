import {BASE_API} from "../utils/constants";

export async function getSwitchesApi(token) {
    try {
        const url = `${BASE_API}/network_api/switches/`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await fetch(url, params)
        return await response.json()
    } catch (error) {
        throw error;
    }
}

export async function addSwitchApi(data, token) {
    try {
        const url = `${BASE_API}/network_api/switches/`;
        const params = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url, params)
        return await response.json()
    } catch (error) {
        throw error;
    }
}

export async function updateSwitchApi(id, data, token){
    try {
        const url = `${BASE_API}/network_api/switches/${id}/`;
        const params = {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url, params)
        return await response.json()
    } catch (error) {
        throw error;
    }
}

export async function deleteSwitchApi(id, token){
    try {
        const url = `${BASE_API}/network_api/switches/${id}/`;
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