import axios from 'axios'

const httpClient = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        'Content-Type': 'application/json'
    }
})


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


