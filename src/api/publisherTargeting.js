import {api} from './request'

const publisherTargeting = async () => {

    try {
        const res = await api.post(
            '', {
                query: `
                    {
                      publisherTargeting {
                        id
                        geo
                        platformIos
                        platformAndroid
                        platformWindows
                        sourceTypeVod
                        sourceTypeSweepstakes
                        cpc
                      }
                    }
            `,
            }
        )

        let response = res.data.data.publisherTargeting
        console.log('publisherTargeting from DB response count:', response.length)
        return response
    } catch (e) {
        console.log(e)
    }

}

export default {
    publisherTargeting
}