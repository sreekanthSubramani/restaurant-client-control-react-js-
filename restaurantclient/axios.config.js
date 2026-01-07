import axios from 'axios'

export const axiosApi = axios.create({
    baseURL : "http://localhost:4444/",
    headers : {
        "Content-Type" : "application/json"
    },
    timeout : '5000ms',
})