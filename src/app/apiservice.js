import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL
const httpClient = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})


export function registrarToken(token) {
    if (token) {
        httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
}

export function postRest(url, objeto) {
    return httpClient.post(url, objeto);
}

export function putRest(url, objeto) {
    return httpClient.put(url, objeto);
}

export function patchRest(url, objeto) {
    return httpClient.patch(url, objeto);
}

export function deleteRest(url) {
    return httpClient.delete(url);
}

export function getRest(url) {
    return httpClient.get(url);
}


