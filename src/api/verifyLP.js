import axios from 'axios'

const verify = axios.create({
    baseURL: `${process.env.SFL_API_ADVERTISER}`,
})

const verifyLP = async (lp) => {
    const {data} = await verify.get(`/verifyLP?domain=${lp}`)
    return data
}

export default {
    verifyLP
}