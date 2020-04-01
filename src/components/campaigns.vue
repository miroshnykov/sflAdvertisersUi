<template>
    <div id="campaigns">
        <h1>Manage Campaigns </h1>

        <v-client-table :data="getCampaigns" :columns="columns" :options="options">

            <div slot="child_row" slot-scope="props">
                <div class="segment-child animated fadeIn">

                </div>
            </div>


        </v-client-table>

    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import {mapActions, mapState, mapGetters} from 'vuex'
    import {formatData} from '../helpers'

    let tableColumnsLog = [
        // 'id',
        'name',
        'budgetTotal',
        'budgetDaily',
        'cpc',
        'user',
        'landingPage',
        'status'
    ]
    export default {
        mounted() {
            this.getCampaigns()
        },
        computed: {
            ...mapState('campaigns', ['campaigns']),
            ...mapGetters('campaigns', ['getCampaigns']),
        },
        methods: {
            async getCampaigns() {

                try {
                    this.tableData = await this.campaigns

                } catch (e) {
                    console.log(e)
                }

            },
        },
        data() {
            return {
                segmentName: '',
                isModalVisible: false,
                eventData: [],
                columns: tableColumnsLog,
                tableData: [],
                countOfRecords: 0,
                options: {
                    // columnsDropdown: true,
                    headings: {

                        // id: 'Id',
                        name: 'name Id',
                        budgetTotal: 'budget Total',
                        budgetDaily: 'budget Daily',
                        cpc: 'cpc',
                        user: 'user',
                        landingPage: 'landingPage',
                        status: 'status'
                    },
                    sortable: tableColumnsLog,
                    filterable: tableColumnsLog,
                    highlightMatches: true,
                },
            }
        }
    }
</script>