import {BASE_API} from "../utils/constants";

export async function getRoutersApi(token) {
    try {
        const url = `${BASE_API}/api/v1/routers/`;
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

export async function addRouterApi(data, token) {
    try {
        const url = `${BASE_API}/api/v1/routers/`;
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

export async function updateRouterApi(id, data, token) {
    try {
        const url = `${BASE_API}/api/v1/routers/${id}/`;
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

export async function deleteRouterApi(id, token){
    try {
        const url = `${BASE_API}/api/v1/routers/${id}/`;
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