import {api} from './request'

const targeting = async (campaignId) => {

    try {
        const res = await api.post(
            '', {
                query: `
                {
                  targeting(campaignId:${campaignId}){
                        name
                        filterTypeId
                        campaignId
                        cpc
                        geo
                        position
                        platformAndroid 
                        platformIos
                        platformWindows
                        sourceTypeSweepstakes
                        sourceTypeVod                        
                        user   
                    
                  } 
                }
            `,
            }
        )

        let response = res.data.data.targeting
        console.log('targeting from DB response count:', response.length)
        return response
    } catch (e) {
        console.log(e)
    }

}

const add = async (data) => {

    let {
        campaignId,
        filterTypeId,
        position,
        geo,
        cpc,
        platformAndroid,
        platformIos,
        platformWindows,
        sourceTypeSweepstakes,
        sourceTypeVod
    } = data

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
                            platformAndroid: ${platformAndroid}
                            platformIos: ${platformIos}
                            platformWindows: ${platformWindows}
                            sourceTypeSweepstakes: ${sourceTypeSweepstakes}
                            sourceTypeVod: ${sourceTypeVod}                             
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

const del = async (campaignId, softDelete = false) => {

    try {
        const res = await api.post(
            '', {
                query: `
                    mutation{
                        deleteTargeting(
                            campaignId: ${campaignId}
                            softDelete: ${softDelete}
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

const restoreSoftDelete = async (campaignId) => {

    try {
        const res = await api.post(
            '', {
                query: `
                    mutation{
                        restoreSoftDelete(
                            campaignId: ${campaignId}
                        ) {
                            id
                            affectedRows
                        }
                    }
            `,
            }
        )

        let response = res.data.data.restoreSoftDelete
        console.log('\nrestoreSoftDelete targeting res:', response)
        return response
    } catch (e) {
        console.log(e)
    }

}


export default {
    targeting,
    add,
    del,
    restoreSoftDelete
}