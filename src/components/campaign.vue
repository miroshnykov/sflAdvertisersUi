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
                   placeholder="campaign"
                   id="campaignName"
                   class="condition__matches campaign custom-input"
                   :value="getCampaignName()"
                   @change="updateCampaignName($event)"
            >
            <br>
            <br>
            <label>Budget Daily </label>
            <br>
            <input type="text"
                   placeholder="budgetDaily"
                   id="campaignBudgetDaily"
                   class="condition__matches budgetDaily custom-input"
                   :value="getCampaignBudgetDaily()"
                   @change="updateCampaignBudgetDaily($event)"
            >
            <br>
            <br>
            <label>Budget Total </label>
            <br>
            <input type="text"
                   placeholder="budgetTotal"
                   id="campaignBudgetTotal"
                   class="condition__matches budgetTotal custom-input"
                   :value="getCampaignBudgetTotal()"
                   @change="updateCampaignBudgetTotal($event)"
            >
            <br>
            <br>
            <label>Budget Total </label>
            <br>
            <input type="text"
                   placeholder="budgetTotal"
                   id="campaignCPC"
                   class="condition__matches budgetTotal custom-input"
                   :value="getCampaignCPC()"
                   @change="updateCampaignCPC($event)"
            >
            <br>
            <br>
            <label>Landing page </label>
            <br>
            <input type="text"
                   placeholder="budgetTotal"
                   id="campaignLandingPage"
                   class="condition__matches budgetTotal custom-input"
                   :value="getCampaignLP()"
                   @change="updateCampaignLP($event)"
            >
            <b-button variant="primary"
                      @click="validateLP()"
            >
                <i class="fas "></i> validate

            </b-button>
            <br>
        </div>

        <targeting :targeting="targeting"/>
        </section>
    </div>
</template>

<script>
    import targeting from './targeting.vue'
    import {mapState, mapGetters} from 'vuex'
    import logo from './logo.vue'

    export default {
        name: 'edit-campaign',
        components: {targeting, logo},
        computed: {
            ...mapState('campaign', ['campaign']),
            ...mapState('targeting', ['targeting']),
            ...mapGetters("campaign", ["getCampaign"]),
            ...mapGetters("targeting", ["getTargeting"]),
        },
        segmentFilter: [],
        async mounted() {
            await this.$store.dispatch('campaign/saveCampaignsStore', this.id)
            await this.$store.dispatch('targeting/saveTargetingStore', this.id)
        },
        methods: {
            getCampaignName() {
                return this.getCampaign.length > 0 && this.getCampaign[0].name
            },
            getCampaignBudgetDaily() {
                return this.getCampaign.length > 0 && this.getCampaign[0].budgetDaily
            },
            getCampaignBudgetTotal() {
                return this.getCampaign.length > 0 && this.getCampaign[0].budgetTotal
            },
            getCampaignCPC() {
                return this.getCampaign.length > 0 && this.getCampaign[0].cpc
            },
            getCampaignLP() {
                return this.getCampaign.length > 0 && this.getCampaign[0].landingPage
            },
            updateCampaignName(event) {
                this.campaign[0].name = event.target.value
            },
            updateCampaignBudgetDaily(event) {
                this.campaign[0].budgetDaily = event.target.value
            },
            updateCampaignBudgetTotal(event) {
                this.campaign[0].budgetTotal = event.target.value
            },
            updateCampaignCPC(event) {
                this.campaign[0].cpc = event.target.value
            },
            updateCampaignLP(event) {
                this.campaign[0].landingPage = event.target.value
            },
            async validateLP(event) {
                let lp = document.querySelector(`#campaignLandingPage`)
                let resStatus = await this.$store.dispatch('campaign/validateLandingPage', lp.value)
                if (resStatus === 200) {
                    this.$swal.fire({
                        type: 'success',
                        position: 'top-end',
                        title: `Domain ${lp.value} is validated `,
                        showConfirmButton: false,
                        timer: 1000
                    })
                } else {
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
