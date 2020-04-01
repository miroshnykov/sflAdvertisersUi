import {api} from './request'

const campaigns = async () => {

    try {
        console.time(`campaigns`)
        const res = await api.post(
            '', {
                query: `
                {
                    campaigns{
                        name
                        budgetTotal
                        budgetDaily
                        cpc
                        user
                        landingPage
                        status
                    } 
                }
            `,
            }
        )

        let response = res.data.data.campaigns
        console.log('\ncampaigns from DB response count:', response.length)
        console.timeEnd(`campaigns`)
        return response
    } catch (e) {
        console.log(e)
    }

}

export default {
    campaigns
}