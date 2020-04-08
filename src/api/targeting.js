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

const add = async (data) => {

    let {campaignId, filterTypeId, position, geo, cpc, platform, sourceType} = data
    platform = platform || '0/0/0'
    sourceType = sourceType || '0/0'
    try {
        const res = await api.post(
            '', {
                query: `
                    mutation{
                      addTargeting(
                            campaignId: ${campaignId}
                            filterTypeId:${filterTypeId}
                            position: ${position}
                            geo: "${geo}"
                            cpc: ${cpc}
                            platform: "${platform}"
                            sourceType: "${sourceType}"
                      ) {
                            id
                      }
                    }
            `,
            }
        )

        let response = res.data.data.addTargeting
        console.log('\nadd targeting res:', response)
        return response
    } catch (e) {
        console.log(e)
    }

}

const del = async (campaignId) => {

    try {
        const res = await api.post(
            '', {
                query: `
                    mutation{
                        deleteTargeting(
                            campaignId: ${campaignId}
                        ) {
                            id
                            affectedRows
                        }
                    }
            `,
            }
        )

        let response = res.data.data.deleteTargeting
        console.log('\ndelete targeting res:', response)
        return response
    } catch (e) {
        console.log(e)
    }

}

export default {
    targeting,
    add,
    del
}