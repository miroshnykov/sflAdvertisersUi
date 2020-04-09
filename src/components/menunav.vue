<template>
    <div class="menu-nav">
    <b-nav vertical class="w-25">
        <a href="/" class="logo"></a>
        <b-nav-item disabled><i class="fas fa-chart-pie"></i> Overview</b-nav-item>
        <b-nav-item active><i class="fas fa-ticket"></i> Campaigns</b-nav-item>
    </b-nav>
    </div>
</template>

<script>
    import {deleteCookie} from '../helpers'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {}
        }
    }
</script>

<style lang="sass">
.menu-nav
    background: #3A3852
    height: 100%
    width: 255px
    padding: 30px
    position: absolute
    left: 0
    top: 0
    z-index: 99

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
    margin-left: 40px

a.nav-link.active
    font-size: 14px
    letter-spacing: 0.5px
    color: rgba(255, 255, 255, 0.9)

a.nav-link.disabled
    font-size: 14px
    letter-spacing: 0.5px
    color: rgba(255, 255, 255, 0.2)
</style>