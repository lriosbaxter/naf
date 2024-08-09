import { BASE_API } from "../utils/constants";


export async function getSourceCodeApi(token, data) {
    try {
        const url = `${BASE_API}api/v1/script-visualize`;
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

