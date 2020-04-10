import {api} from './request'

const campaigns = async () => {

    try {
        const res = await api.post(
            '', {
                query: `
                {
                    campaigns{
                        id
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
        return response
    } catch (e) {
        console.log(e)
    }

}

const del = async (id) => {

    try {
        const res = await api.post(
            '', {
                query: `
                    mutation{
                        deleteCampaign(
                            campaignId: ${id}
                        ) {
                            id
                            affectedRows
                        }
                    }
            `,
            }
        )

        let response = res.data.data.deleteCampaign
        console.log('\ndelete campaign res:', response)
        return response
    } catch (e) {
        console.log(e)
    }

}


export default {
    campaigns,
    del
}