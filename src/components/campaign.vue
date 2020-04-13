<template>
    <div id="edit-segment">
        <logo></logo>
        <h1>Rules &amp; Conditions</h1>
        <ul class="segment-info">
            <li>Campaign ID: <b>{{id}}</b></li>
        </ul>
        <section class="filter">
            <div class="campaign-line">
                <label>Campaign name</label>
                <br>
                <input type="text"
                       placeholder="campaign name"
                       :id="setElId(`name`)"
                       class="condition__matches campaign custom-input"
                       :value="getFieldName(`name`)"
                       @change="changeField($event,`name`)"
                >
                <br>

                <div class="campaign-block">
                    <select
                            class="custom-select-status"
                            @change="changeField($event, `status`)"
                            :id="setElId(`status`)"
                    >

                        <option
                                id="filterType"
                                v-for="{id, name} in getStatusList()"
                                :value="name"
                                :selected="name === getFieldName(`status`)"
                                :key="name"
                        >{{name}}
                        </option>

                    </select>
                </div>

                <br>
                <label>Budget Daily </label>
                <br>
                <input type="number"
                       step=10
                       placeholder="budgetDaily"
                       :id="setElId(`budgetDaily`)"
                       class="condition__matches budgetDaily custom-input"
                       :value="getFieldName(`budgetDaily`)"
                       @change="changeField($event,`budgetDaily`)"
                >
                <br>
                <br>
                <label>Budget Total </label>
                <br>
                <input type="number"
                       step=10
                       placeholder="budgetTotal"
                       :id="setElId(`budgetTotal`)"
                       class="condition__matches budgetTotal custom-input"
                       :value="getFieldName(`budgetTotal`)"
                       @change="changeField($event,`budgetTotal`)"
                >
                <br>
                <br>
                <label>CPC </label>
                <br>
                <input type="number"
                       step=0.1
                       placeholder="campaignCPC"
                       :id="setElId(`cpc`)"
                       class="condition__matches budgetTotal custom-input"
                       :value="getFieldName(`cpc`)"
                       @change="changeField($event,`cpc`)"
                >
                <br>
                <br>
                <label>Landing page </label>
                <br>
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

            <targeting/>
        </section>
    </div>
</template>

<script>
    import targeting from './targeting.vue'
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
    import logo from './logo.vue'

    export default {
        name: 'edit-campaign',
        components: {targeting, logo},
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
            setElId(value) {
                return `${value}-${this.id}`
            },
            getFieldName(field) {
                return this.getCampaign.length > 0 && this.getCampaign[0][field]
            },
            getStatusList() {
                return [
                    {id: 0, name: 'active'},
                    {id: 1, name: 'inactive'}
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
                updateFieldData.value = event.target.value
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

<style lang="scss">
    .landingPage, .validateLandingPage {
        float: left;
    }

    .custom-select:hover, .custom-select:focus,
    .custom-input:hover, .custom-input:focus,
    .ui.search.selection.dropdown > input.search:hover, .ui.search.selection.dropdown > input.search:focus {
        border-color: #36B8E1 !important;
        box-shadow: 0 0 5px #36B8E1 !important;
        cursor: pointer !important;
    }

    .custom-input::placeholder {
        color: #ACC3CF;
    }

    .custom-input {
        position: relative;
        width: auto;
        color: #555;
        max-width: 280px;
        border-radius: 4px;
        padding: 5px 10px;
        height: calc(1.5em + 0.75rem + 2px);
        text-align: left;
        border: 0;
    }

    .custom-input::placeholder {
        color: #ACC3CF;
    }
</style>
