import {BASE_API} from "../utils/constants";

export async function getSitesApi(token) {
    try {
        const url = `${BASE_API}/api/v1/network_site/`;
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

export async function addSiteApi(data, token) {
    try {
        const url = `${BASE_API}/api/v1/network_site/`;
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

export async function updateSiteApi(id, data, token){
    try {
        const url = `${BASE_API}/api/v1/network_site/${id}/`;
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


export async function deleteSiteApi(id, token){
    try {
        const url = `${BASE_API}/api/v1/network_site/${id}/`;
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

export async function retrieveSiteApi(id, token){
    try {
        const url = `${BASE_API}/api/v1/network_site/${id}/`;
        const params = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, params)
        console.log(await response.json())
        return await response.json()
    } catch (error) {
        throw error;
    }
}