import axios from 'axios'
import {getCookie} from '../helpers'

console.log(`\nSFL_CORE_URL:${process.env.SFL_CORE_URL_EXTERNAL}`)
console.log(`\nSFL_PLATFORM_ADV_URL:${process.env.SFL_PLATFORM_ADV_URL}`)
console.log(`\nSFL_CORE_AUTH_URL:${process.env.SFL_CORE_AUTH_URL_EXTERNAL}`)

const login = axios.create({
    baseURL: `${process.env.SFL_CORE_AUTH_URL_EXTERNAL}`,
})

const getLoginUrl = async () => {
    console.log(`\ngetLoginUrl env:${process.env.SFL_CORE_AUTH_URL_EXTERNAL}`)
    const {data} = await login.get('/loginUrl')
    return data
}

const tokenVerify = axios.create({
    baseURL: `${process.env.SFL_CORE_CONDITION_URL_INTERNAL}`,
})

const verifyToken = async () => {
    let token = getCookie('accessToken')
    const {data} = await tokenVerify.get(`/verifyToken?token=${token}`)
    return data
}

export default {
    getLoginUrl,
    verifyToken
}