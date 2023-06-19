import axios from 'axios'

const API_BASE_URL = 'http://localhost:8181/api/'

const APIService = {
    getBoardById(id) {
        return axios.get(API_BASE_URL + 'boards/id/' + id)
    },
    getColumnById(id) {
        return axios.get(API_BASE_URL + 'columns/id/' + id)
    },
    getColumnByOrderColumn(orderColumn) {
        return axios.get(API_BASE_URL + 'columns/order/' + orderColumn)
    },
    getCardById(id) {
        return axios.get(API_BASE_URL + 'cards/id/' + id)
    },
    getCardByOrderAndColumns(order, columnId) {
        return axios.get(API_BASE_URL + 'cards/order/' + order + '-' + columnId)
    },
    saveBoard(params) {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
            },
            data: params,
        }
        axios.request(`${API_BASE_URL}boards/`, config)
    },
    saveColumn(params) {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
            },
            data: params,
        }
        axios.request(`${API_BASE_URL}columns/`, config)
    },
    saveCard(param) {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
            },
            data: param,
        }
        axios.request(`${API_BASE_URL}cards/`, config)
    },
    upload(formData) {
        let config = {
            method: 'post',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
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
}

export default APIService
