import {api} from './request'

const campaign = async (id) => {

    try {
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
                        landingPageValid
                        noLimit
                        status
                        spentDaily
                        spentTotal
                        countClickTotal
                        countClickDaily
                    } 
                }
            `,
            }
        )

        let response = res.data.data.campaign
        // console.log('\ncampaign from DB response count:', response.length)
        return response
    } catch (e) {
        console.log(e)
    }

}

const addCampaign = async (data) => {

    const {
        name,
        budgetTotal,
        budgetDaily,
        cpc,
        landingPage,
        landingPageValid,
        noLimit
    } = data

    try {
        const res = await api.post(
            '', {
                query: `
                    mutation{
                        addCampaign(
                            name:"${name}",
                            budgetTotal:${budgetTotal || 0},
                            budgetDaily:${budgetDaily || 0},
                            cpc:${cpc || 0},
                            noLimit:${noLimit||false},
                            landingPage:"${landingPage || ""}",
                            landingPageValid:${landingPageValid || false}
                        ){
                            id
                        } 
                }
            `,
            }
        )

        let response = res.data.data.addCampaign
        console.log('\ncampaign from DB response count:', response.length)
        return response
    } catch (e) {
        console.log(e)
    }

}

const updateCampaign = async (data) => {

    const {
        id,
        name,
        budgetTotal,
        budgetDaily,
        cpc,
        landingPage,
        landingPageValid,
        noLimit,
        status
    } = data

    try {
        const res = await api.post(
            '', {
                query: `
                    mutation{
                        updateCampaign(
                            id:${id},
                            name:"${name}",
                            budgetTotal:${budgetTotal || 0},
                            budgetDaily:${budgetDaily || 0},
                            status: "${status}",
                            cpc:${cpc || 0},
                            noLimit:${noLimit},
                            landingPage:"${landingPage || ""}"
                            landingPageValid:${landingPageValid}
                        ){
                            id
                        } 
                }
            `,
            }
        )

        let response = res.data.data.updateCampaign
        console.log('\ncampaign from DB response count:', response.length)
        return response
    } catch (e) {
        console.log(e)
    }

}

const updateCampaignName = async (data) => {
    const {id, name} = data

    try {
        const res = await api.post(
            '', {
                query: `
                    mutation{
                        updateCampaignName(
                            id:${id},
                            name:"${name}"
                        ){
                            id
                        } 
                }
            `,
            }
        )

        let response = res.data.data.updateCampaignName
        console.log('\nupdateCampaignName from DB response count:', response.length)
        return response
    } catch (e) {
        console.log(e)
    }

}
export default {
    campaign,
    addCampaign,
    updateCampaign,
    updateCampaignName
}