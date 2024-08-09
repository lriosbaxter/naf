import {BASE_API} from "../utils/constants";

export async function loginApi(formValue) {
    try {
        const url = `${BASE_API}/auth/token`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formValue)
        };

        const response = await fetch(url, params)

        if(response.status !== 200) {
            throw new Error("Usuario o contraseña incorrectos")
        }
        return await response.json()
    } catch (error) {
        throw error
    }
}

export async function getMeApi(token) {
    try {
        const url = `${BASE_API}/auth/user`;
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

export async function getUsersApi(token) {
    try {
        const url = `${BASE_API}/api/v1/users/`;
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

export async function addUserApi(data, token) {
    try {
        const url = `${BASE_API}/api/v1/users/`;
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

export async function updateUserApi(id, data, token){
    try {
        const url = `${BASE_API}/api/v1/users/${id}/`;
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

export async function deleteUserApi(id, token){
    try {
        const url = `${BASE_API}/api/v1/users/${id}/`;
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