import {api} from './request'

const targeting = async (campaignId) => {

    try {
        console.time(`targeting`)
        const res = await api.post(
            '', {
                query: `
                {
                  targeting(campaignId:${campaignId}){
                        name
                        sourceType
                        filterTypeId
                        campaignId
                        cpc
                        geo
                        position
                        platform
                        user   
                    
                  } 
                }
            `,
            }
        )

        let response = res.data.data.targeting
        console.log('\ntargeting from DB response count:', response.length)
        console.timeEnd(`targeting`)
        return response
    } catch (e) {
        console.log(e)
    }

}

export default {
    targeting
}