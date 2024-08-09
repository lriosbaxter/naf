import { BASE_API } from "../utils/constants";


export async function getScriptsApi(token) {
    try {
        const url = `${BASE_API}/api/v1/script/`;
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

export async function addScriptApi(data, token) {
    try {
        const url = `${BASE_API}/api/v1/script/`;
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

export async function updateScriptApi(id, data, token) {
    try {
        const url = `${BASE_API}/api/v1/script/${id}/`;
        const params = {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, params)
        console.log(response)
        return await response.json()
    } catch (error) {
        throw error;
    }
}

export async function deleteScriptApi(token, id) {
    try {
        const url = `${BASE_API}/api/v1/script/${id}/`;
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

export async function runScriptApi(token, formValue, script_id) {
    try {
        const url = `${BASE_API}/api/v1/script-run/${script_id}`;
        const params = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formValue)
        };

        const response = await fetch(url, params)
        return await response.json();
    } catch (error) {
        throw error
    }
}

export async function runBGPScript(formValue) {
    try {
        const url = `${BASE_API}/api/v1/bgp-script-run/13`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formValue)
        };

        const response = await fetch(url, params)

        if(response.status !== 200) {
            throw new Error("Error")
        }
        const result = await response.json();
        console.log(result)
        return result
    } catch (error) {
        throw error
    }
}