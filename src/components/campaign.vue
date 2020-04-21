<template>
    <div id="edit-segment">
        <menunav></menunav>
        <topbar></topbar>

        <h1>Edit Campaign</h1>
        <b-row class="text-center">
            <b-col cols="2">
                <div class="condition__controls">
                    <label>ID</label>
                    <input type="text"
                        class="condition__matches campaign custom-input"
                        :value="getId(`id`)"
                        disabled
                    >
                </div>
            </b-col>
            <b-col cols="6">
                <div class="condition__controls">
                    <label>Campaign Name</label>
                    <input type="text"
                        placeholder="My Campaign"
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

            <!-- <section class="filter">

                <div class="condition__controls">
                    <label>Campaign ID</label>
                    <input type="text"
                        class="condition__matches campaign custom-input"
                        :value="getId(`id`)"
                        disabled
                    >
                </div>
                
                <div class="condition__controls">
                    <label>Campaign name</label>
                    <input type="text"
                        placeholder="campaign name"
                        :id="setElId(`name`)"
                        class="condition__matches campaign custom-input"
                        :value="getFieldName(`name`)"
                        @change="changeField($event,`name`)"
                    >
                </div>

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
            </section> -->

        <hr>
        <h2>Advertising Budget</h2>

        <b-row class="text-center">
            <b-col cols="4">
                <div class="condition__controls">
                    <label>Total Budget (Campaign)</label>
                    <input type="number"
                        step=10
                        placeholder="budgetTotal"
                        :id="setElId(`budgetTotal`)"
                        class="condition__matches budgetTotal custom-input"
                        :value="getFieldName(`budgetTotal`)"
                        @change="changeField($event,`budgetTotal`)"
                    >
                    <b-form-text id="password-help-block">
                    Spent: $1,418.00
                    <!-- TODO: Add Spent value -->
                    </b-form-text>
                </div>
            </b-col>
            <b-col cols="2">
                <div class="condition__controls">
                    <label>Daily Budget</label>
                    <input type="number"
                        step=10
                        placeholder="budgetDaily"
                        :id="setElId(`budgetDaily`)"
                        class="condition__matches budgetDaily custom-input"
                        :value="getFieldName(`budgetDaily`)"
                        @change="changeField($event,`budgetDaily`)"
                    >
                    <b-form-text id="password-help-block">
                    Spent: $624.50
                    <!-- TODO: Add Spent value -->
                    </b-form-text>
                </div>
            </b-col>
            <b-col cols="2">
                <div class="condition__controls">
                    <label>Max. CPC (cost per click)</label>
                    <input type="number"
                        step=0.1
                        placeholder="campaignCPC"
                        :id="setElId(`cpc`)"
                        class="condition__matches budgetTotal custom-input"
                        :value="getFieldName(`cpc`)"
                        @change="changeField($event,`cpc`)"
                    >
                </div>
            </b-col>
        </b-row>

        <b-row class="text-center">
            <b-col cols="8">
                <div class="condition__controls">
                    <label>Landing Page URL </label>
                    <input type="text"
                        placeholder="https://domain.com"
                        :id="setElId(`landingPage`)"
                        class="condition__matches landingPage custom-input"
                        :value="getFieldName(`landingPage`)"
                        @change="changeField($event,`landingPage`)"
                    >
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

            <!-- <section class="filter">
                <div class="condition__controls">
                    <label>Budget Daily </label>
                    <input type="number"
                        step=10
                        placeholder="budgetDaily"
                        :id="setElId(`budgetDaily`)"
                        class="condition__matches budgetDaily custom-input"
                        :value="getFieldName(`budgetDaily`)"
                        @change="changeField($event,`budgetDaily`)"
                    >
                    <label>Budget Total </label>
                    <input type="number"
                        step=10
                        placeholder="budgetTotal"
                        :id="setElId(`budgetTotal`)"
                        class="condition__matches budgetTotal custom-input"
                        :value="getFieldName(`budgetTotal`)"
                        @change="changeField($event,`budgetTotal`)"
                    >
                    <label>CPC </label>
                    <input type="number"
                        step=0.1
                        placeholder="campaignCPC"
                        :id="setElId(`cpc`)"
                        class="condition__matches budgetTotal custom-input"
                        :value="getFieldName(`cpc`)"
                        @change="changeField($event,`cpc`)"
                    >
                    <label>Landing page </label>
                    <input type="text"
                        placeholder="campaignLandingPage"
                        :id="setElId(`landingPage`)"
                        class="condition__matches landingPage custom-input"
                        :value="getFieldName(`landingPage`)"
                        @change="changeField($event,`landingPage`)"
                    >
                    <b-form-checkbox
                            class="validateLandingPage" size="lg"
                            :id="setElId(`landingPageValid`)"
                            disabled
                            readonly
                            :checked="getFieldName(`landingPageValid`)"
                    ></b-form-checkbox>

                    <b-button variant="primary"
                            @click="validateLP()"
                    >
                        <i class="fas "></i> validate

                    </b-button>
                    <br>
                </div>

            </section> -->

            <hr>
            <h2>Targeting</h2>

            <targeting></targeting>


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
                    // {id: 2, name: 'Paused'}
                ]
            },
            async changeField(event, field) {
                let el = document.querySelector(`#${field}-${this.id}`)
                if (Number(event.target.value) === 0) {
                    el && el.classList.add('error')
                } else {
                    el && el.classList.remove('error')
                }
                let updateFieldData = {}
                updateFieldData.value = event.target.value.toLowerCase()
                updateFieldData.field = field
                this.updateField(updateFieldData)
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
                        title: 'Validation Error',
                        text: `Please check domain name:${lp.value}`,
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