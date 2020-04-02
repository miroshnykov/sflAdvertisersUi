import {api} from './request'

const campaign = async (id) => {

    try {
        console.time(`campaign`)
        const res = await api.post(
            '', {
                query: `
                {
                    campaign(id:${id}){
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

        let response = res.data.data.campaign
        console.log('\ncampaign from DB response count:', response.length)
        console.timeEnd(`campaign`)
        return response
    } catch (e) {
        console.log(e)
    }

}

const addCampaign = async (data) => {

    const {name, budgetTotal, budgetDaily, cpc, landingPage} = data
    try {
        console.time(`addCampaign`)
        const res = await api.post(
            '', {
                query: `
                    mutation{
                        addCampaign(
                            name:"${name}",
                            budgetTotal:${budgetTotal || 0},
                            budgetDaily:${budgetDaily || 0},
                            cpc:${cpc || 0},
                            landingPage:"${landingPage || ""}"
                        ){
                            id
                        } 
                }
            `,
            }
        )

        let response = res.data.data.addCampaign
        console.log('\ncampaign from DB response count:', response.length)
        console.timeEnd(`campaign`)
        return response
    } catch (e) {
        console.log(e)
    }

}

export default {
    campaign,
    addCampaign
}