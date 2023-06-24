import axios from 'axios'
import { ACCESS_TOKEN } from 'ultil/constants'

const API_BASE_URL = 'http://localhost:8181/api/'

export const getAuthenToken = () => {
    return window.localStorage.getItem(ACCESS_TOKEN)
}

export const setAuthenToken = (token) => {
    return window.localStorage.setItem(ACCESS_TOKEN, token)
}

export const configAxios = (method, url, contentType) => {
    let headers = { 'Content-Type': { contentType } }
    if (getAuthenToken() !== null && getAuthenToken() !== 'null') {
        headers = {
            ...headers,
            Authorization: `Bearer ${JSON.parse(getAuthenToken())}`,
        }
    }

    const config = {
        method: method,
        maxBodyLength: Infinity,
        url: url,
        headers: headers,
    }
    return config
}

const APIService = {
    getAccountByUsername(username) {
        const config = configAxios(
            'GET',
            API_BASE_URL + 'auth/user-information/' + username,
            'application/json'
        )
        return axios.request(config)
    },
    getBoardById(id) {
        const config = configAxios(
            'GET',
            API_BASE_URL + 'boards/id/' + id,
            'application/json'
        )
        return axios.request(config)
    },
    getBoardByAccount(accountId) {
        const config = configAxios(
            'GET',
            API_BASE_URL + 'boards/account/' + accountId,
            'application/json'
        )
        return axios.request(config)
    },
    getColumnById(id) {
        const config = configAxios(
            'GET',
            API_BASE_URL + 'columns/id/' + id,
            'application/json'
        )
        return axios.request(config)
    },
    getColumnByOrderColumn(columnOrder, boardId) {
        const url =
            API_BASE_URL +
            'columns/order?columnOrder=' +
            columnOrder +
            '&boardId=' +
            boardId
        const config = configAxios('GET', url, 'application/json')

        return axios.request(config)
    },
    getCardById(id) {
        const config = configAxios(
            'GET',
            API_BASE_URL + 'cards/id/' + id,
            'application/json'
        )
        return axios.request(config)
    },
    saveBoard(params) {
        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(getAuthenToken())}`,
            },
            data: params,
        }
        axios.request(`${API_BASE_URL}boards/`, config)
    },
    saveColumn(params) {
        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(getAuthenToken())}`,
            },
            data: params,
        }
        axios.request(`${API_BASE_URL}columns/`, config)
    },
    saveCard(params) {
        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(getAuthenToken())}`,
            },
            data: params,
        }
        axios.request(`${API_BASE_URL}cards/`, config)
    },
    upload(params) {
        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${JSON.parse(getAuthenToken())}`,
            },
            data: params,
        }
        axios.request(`${API_BASE_URL}upload`, config)
    },
    login(params) {
        let config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        return axios.post(`${API_BASE_URL}auth/login`, params, config)
    },
    register(params) {
        let config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        return axios.post(`${API_BASE_URL}auth/register`, params, config)
    },
}

export default APIService
