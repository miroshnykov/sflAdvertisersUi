<template>
    <div id="edit-segment">
        <topbar></topbar>
        <menunav></menunav>

        <b-row class="text-center">
            <b-col cols="1">
                <div class="condition__controls">
                    <label>ID</label>
                    <input type="text"
                           class="condition__matches campaign custom-input"
                           :value="getId(`id`)"
                           disabled
                    >
                </div>
            </b-col>
            <b-col cols="7">
                <div class="condition__controls">
                    <label>Campaign Name</label>
                    <input type="text"
                           placeholder="ex: My First Campaign"
                           :id="setElId(`name`)"
                           class="condition__matches campaign custom-input"
                           :value="getFieldName(`name`)"
                           @change="changeField($event,`name`)"
                    >
                </div>
            </b-col>
            <b-col cols="2">
                <div class="condition__controls">
                    <label>Status</label>
                    <select
                            class="custom-select"
                            @change="changeField($event, `status`)"
                            :id="setElId(`status`)"
                    >
                        <option
                                id="filterType"
                                v-for="{id, name} in getStatusList()"
                                :value="name"
                                :selected="name.toLowerCase() === getFieldName(`status`)"
                                :key="name"
                        >{{name}}
                        </option>
                    </select>
                </div>
            </b-col>
        </b-row>

        <hr>
        <h2>Advertising Budget</h2>

        <b-col cols="2">
            <div class="condition__controls">
                <label>&nbsp;No limit</label>
                <b-form-checkbox
                        class="validateLandingPage" size="lg"
                        :id="setElId(`noLimit`)"
                        :checked="getFieldName(`noLimit`)"
                        @change="changeField($event,`noLimit`)"
                ></b-form-checkbox>
            </div>
        </b-col>
        <b-row class="text-center">

            <b-col cols="2">
                <div class="condition__controls">
                    <label>Daily Budget</label>
                    <input type="number"
                           step=10
                           placeholder="ex: 1000"
                           :disabled="getFieldName(`noLimit`)"
                           :id="setElId(`budgetDaily`)"
                           class="condition__matches budgetDaily custom-input"
                           :value="getFieldName(`budgetDaily`)"
                           @change="changeField($event,`budgetDaily`)"
                    >
                    <b-form-text id="budgetDaily">
                        Spent: {{getFieldName(`spentDaily`) || 0}}
                    </b-form-text>
                </div>
            </b-col>
            <b-col cols="4">
                <div class="condition__controls">
                    <label>Campaign Total Budget</label>
                    <input type="number"
                           step=100
                           placeholder="ex: 10000"
                           :disabled="getFieldName(`noLimit`)"
                           :id="setElId(`budgetTotal`)"
                           class="condition__matches budgetTotal custom-input"
                           :value="getFieldName(`budgetTotal`)"
                           @change="changeField($event,`budgetTotal`)"
                    >
                    <b-form-text id="budgetTotal">
                        Spent: {{getFieldName(`spentTotal`)|| 0}}
                    </b-form-text>
                </div>
            </b-col>
            <b-col cols="2">
                <div class="condition__controls">
                    <label>Campaign Max. CPC <a class="question"
                                                v-b-tooltip.hover.right.html="'<b>Cost per click.</b><br>Value must be higher than Targeting Max. CPC'"><i
                            class="fad fa-question-circle"></i></a></label>
                    <input type="number"
                           step=0.1
                           placeholder="ex: 0.5"
                           min="0.0001" max="1000"
                           :disabled="getFieldName(`noLimit`)"
                           :id="setElId(`cpc`)"
                           class="condition__matches budgetTotal custom-input"
                           :value="getFieldName(`cpc`)"
                           @change="changeField($event,`cpc`)"
                           pattern="^\d+(?:\.\d{1,2})?$"
                           onblur="this.parentNode.parentNode.style.backgroundColor=/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':'transparent'
                    ">
                </div>
            </b-col>
        </b-row>

        <b-row class="text-center">
            <b-col cols="8">
                <div class="condition__controls">
                    <label>Landing Page URL</label>
                    <input type="text"
                           placeholder="https://domain.com"
                           :id="setElId(`landingPage`)"
                           class="condition__matches landingPage custom-input"
                           :value="getFieldName(`landingPage`)"
                           @change="changeField($event,`landingPage`)"
                    >
                    <b-form-text id="totalClicks">
                        Page Clicks: Total {{getFieldName(`countClickTotal`) || 0}} | Daily
                        {{getFieldName(`countClickDaily`) || 0}}
                    </b-form-text>
                </div>
            </b-col>
            <b-col cols="2">
                <div class="condition__controls">
                    <label>&nbsp;</label>
                    <b-button class="btn-validate" variant="primary"
                              @click="validateLP()"
                    >
                        Validate
                    </b-button>
                </div>
            </b-col>
            <b-col cols="2">
                <div class="condition__controls">
                    <label>&nbsp;</label>
                    <b-form-checkbox
                            class="validateLandingPage" size="lg"
                            :id="setElId(`landingPageValid`)"
                            disabled
                            readonly
                            :checked="getFieldName(`landingPageValid`)"
                    ></b-form-checkbox>
                </div>
            </b-col>
        </b-row>

        <hr>

        <targeting></targeting>

        <!-- Hide for now -->
        <!-- <hr class="small">

        <b-row class="text-center trafficSource" style="display: none">
            <b-col cols="1">
                <div class="condition__controls">
                    <label>Exclude</label>
                    <b-form-checkbox switch size="lg"></b-form-checkbox>
                </div>
            </b-col>
            <b-col cols="5">
                <div class="condition__controls">
                    <label>Traffic Source</label> -->
        <!-- TODO: Add Traffic Source backend feature -->
        <!-- <b-form-tags
        input-id="tags-separators"
        separator=" "
        placeholder=""
        class="mb-2 traffic"
        tag-variant="primary"
        remove-on-delete
        onkeypress="
            return (
                event.charCode == 8
                || event.charCode == 0
                || event.charCode == 13
                || event.charCode == 32
                || event.charCode == 188
            ) ? null : event.charCode >= 48 && event.charCode <= 57"
        onpaste="return false"
        onkeyup="
            if(this.value === '' || parseInt(this.value)>100){
                this.value = 100
                return false
            }
        "
        ></b-form-tags>
        <b-form-text id="trafficSource">
        Numbers only, separated by space or enter
        </b-form-text>
    </div>
</b-col>
</b-row> -->

    </div>
</template>

<script>
    import targeting from './targeting.vue'
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
    import topbar from './topbar.vue'
    import menunav from './menunav.vue'

    export default {
        name: 'edit-campaign',
        components: {targeting, topbar, menunav},
        computed: {
            ...mapState('campaign', ['campaign']),
            // ...mapState('targeting', ['targeting']),
            ...mapGetters("campaign", ["getCampaign"]),
            ...mapGetters("targeting", ["getTargeting"]),
            // ...mapMutations("targeting", ["addTargeting"])
        },
        async mounted() {
            await this.saveCampaignsStore(this.id)
            await this.saveTargetingStore(this.id)
        },
        methods: {
            ...mapActions("campaign", ["saveCampaignsStore"]),
            ...mapActions("targeting", ["saveTargetingStore"]),
            ...mapMutations("campaign", ["updateField"]),
            getId(value) {
                return `${this.id}`
            },
            setElId(value) {
                return `${value}-${this.id}`
            },
            getFieldName(field) {
                return this.getCampaign.length > 0 && this.getCampaign[0][field]
            },
            getStatusList() {
                return [
                    {id: 0, name: 'Active'},
                    {id: 1, name: 'Inactive'},
                    // {id: 2, name: 'Paused'},
                    // {id: 2, name: 'Ended'}
                    // TODO: Add 'Paused' and 'Ended' as status options
                ]
            },
            async changeField(event, field) {

                if (field === 'cpc') {
                    let checkTargeting = this.getTargeting
                    let cpc = event.target.value

                    let valid = []
                    checkTargeting.forEach(item => {
                        let elColor = document.querySelector(`#cpc-${item.position}`)
                        elColor.style.color = '#7f98a5'
                        if (item.cpc > cpc) {
                            valid.push(item)
                        }
                    })
                    valid.forEach(item => {
                        let elColor = document.querySelector(`#cpc-${item.position}`)
                        elColor.style.color = 'red'
                    })
                }

                if (event.target){
                    let el = document.querySelector(`#${field}-${this.id}`)
                    if (Number(event.target.value) === 0) {
                        el && el.classList.add('error')
                    } else {
                        el && el.classList.remove('error')
                    }
                    let updateFieldData = {}
                    updateFieldData.value = event.target.value
                    updateFieldData.field = field
                    this.updateField(updateFieldData)
                }

                if (field === 'noLimit') {
                    this.updateField({
                        field: `noLimit`,
                        value: event
                    })
                }
                if (field === 'landingPage') {
                    this.updateField({
                        field: `landingPageValid`,
                        value: false
                    })
                }
            },
            async validateLP() {
                let lp = document.querySelector(`#landingPage-${this.id}`)
                let resStatus = await this.$store.dispatch('campaign/validateLandingPage', lp.value)
                let el = document.querySelector(`#landingPageValid-${this.id}`)
                if (resStatus === 200) {

                    el ? el.checked = true : ''

                    let updateFieldData = {}
                    updateFieldData.value = true
                    updateFieldData.field = `landingPageValid`
                    this.updateField(updateFieldData)
                    this.$swal.fire({
                        type: 'success',
                        position: 'top-end',
                        title: `Domain ${lp.value} is validated `,
                        showConfirmButton: false,
                        timer: 1000
                    })
                } else {
                    el ? el.checked = false : ''

                    let updateFieldData = {}
                    updateFieldData.value = false
                    updateFieldData.field = `landingPageValid`
                    this.updateField(updateFieldData)
                    this.$swal.fire({
                        title: 'Invalid Domain',
                        text: `Please check domain name: ${lp.value}`,
                    })
                }


            },

        },
        data() {
            return {
                id: Number(this.$route.params.id)
            };
        }
    };
</script>

<style lang="sass">
    .container
        margin-left: 300px
</style>