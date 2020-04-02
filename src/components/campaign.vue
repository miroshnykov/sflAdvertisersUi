<template>
    <div id="edit-segment">
        <logo></logo>
        <h1>Rules &amp; Conditions</h1>
        <ul class="segment-info">
            <li>Campaign ID: <b>{{id}}</b></li>
        </ul>
        <div class="condition-line">
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
        </div>
                <conditions :campaign="campaign"/>
    </div>
</template>

<script>
    import conditions from './conditions.vue'
    import {mapState, mapGetters} from 'vuex'
    import logo from './logo.vue'

    export default {
        name: 'edit-campaign',
        components: {conditions, logo},
        computed: {
            ...mapState('campaign', ['campaign']),
            ...mapGetters("campaign", ["getCampaign"]),
        },
        segmentFilter: [],
        async mounted() {
            await this.$store.dispatch('campaign/saveCampaignsStore', this.id)
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
            updateCampaignName(event) {
                this.campaign[0].name = event.target.value
            },
            updateCampaignBudgetDaily(event) {
                console.log(event)
            },
            updateCampaignBudgetTotal(event) {
                console.log(event)
            }
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
