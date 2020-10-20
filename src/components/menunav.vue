<template>
    <div class="menu-nav">
        <b-nav vertical class="w-25">
            <a href="#" class="logo"></a>
            <!-- Hide for now -->
            <!-- <b-nav-item disabled><i class="fas fa-chart-pie"></i> Overview</b-nav-item> -->
            <b-nav-item active><a @click="this.mainPage"><i class="fas fa-ticket"></i> Campaigns</a></b-nav-item>
            <!-- <hr class="nav">
            <b-nav-item disabled><i class="fas fa-cog"></i> Settings</b-nav-item> -->
        </b-nav>
    </div>
</template>

<script>
    import {deleteCookie} from '../helpers'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {}
        },
        methods: {
            mainPage() {
                let camp = this.$store.state.campaign.campaign
                let campaignId = this.$store.state.campaign.campaign[0].id

                let emptyKey = []
                camp.forEach(item => {
                    let keys = Object.keys(item)
                    keys.forEach(key => {
                        if (
                            key === 'noLimit' ||
                            key === 'landingPageValid' ||
                            key === 'spentDaily' ||
                            key === 'spentTotal' ||
                            key === 'countClickTotal' ||
                            key === 'countClickDaily'
                        ) {
                            return
                        }
                        if (Number(item[key]) === 0) {
                            emptyKey.push(key)
                        }
                    })
                })

                if (emptyKey.length > 0) {
                    emptyKey.forEach(key => {
                        let el = document.querySelector(`#${key}-${campaignId}`)
                        el && el.classList.add('error')
                    })
                    this.$swal.fire({
                        title: 'Validation Error',
                        text: `Please check fields: ${JSON.stringify(emptyKey)}`,
                    })
                    return
                }

                // $store.state.campaign.
                this.$router.push('/campaigns')
                location.reload()
            },
        },
    }
</script>

<style lang="sass">
    .menu-nav
        background: #3A3852
        height: 100%
        width: 255px
        padding: 30px
        position: fixed
        left: 0
        top: 0
        z-index: 99

        hr.nav
            border: 1px solid #DFE0EB
            opacity: 0.1
            width: 180px
            margin: 150px auto 40px

        .logo
            display: block
            width: 183px
            height: 32px
            margin: 20px 0px
            background: url('../assets/logo.svg')
            background-size: cover
            transition: all 0.5s ease
            margin-bottom: 50px

    .nav-link
        display: block
        padding: 1rem 0.5rem
        margin-left: 20px

    a.nav-link.active
        font-size: 14px
        letter-spacing: 0.5px
        color: rgba(255, 255, 255, 0.9)
    // background: rgba(255, 255, 255, 0.1)

    a.nav-link.disabled
        font-size: 14px
        letter-spacing: 0.5px
        color: rgba(255, 255, 255, 0.2)

    li.nav-item a svg
        margin-right: 10px
</style>