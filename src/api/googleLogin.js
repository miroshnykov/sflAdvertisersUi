import axios from 'axios'
import {getCookie} from '../helpers'

const login = axios.create({
    baseURL: `${process.env.SFL_CORE_AUTH_URL}`,
})

const getLoginUrl = async () => {
    const {data} = await login.get('/loginUrl')
    return data
}

const verifyToken = async () => {
    let token = getCookie('accessToken')
    const {data} = await login.get(`/verifyToken?token=${token}`)
    return data
}

export default {
    getLoginUrl,
    verifyToken
}