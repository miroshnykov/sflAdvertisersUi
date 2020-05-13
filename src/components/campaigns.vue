<template>
    <div id="campaigns">
        <menunav></menunav>
        <logo></logo>
        <h1>Manage Campaigns</h1>

        <b-button variant="primary" class="margin-left-10" @click="this.addCampaign">
            <i class="fas fa-plus" data-fa-transform="shrink-2"></i> Create Campaign
        </b-button>

        <v-client-table :data="getCampaigns" :columns="columns" :options="options">

            <div slot="id" slot-scope="props" class="text-center">
                <span class="id">{{props.row.id}}</span>
            </div>

            <div slot="name" slot-scope="{row, update, setEditing, isEditing, revertValue}">

              <span @click="edit(row)">
                  <span class="segment-name" @click="edit(row)">{{row.name}}</span>
              </span>

                <button @click="setEditing(true)" v-if="!isEditing()" class="btn btn-link"
                        v-b-tooltip.hover.right="'Quick edit'">
                    <i class="far fa-pencil"></i>
                </button>
                <span v-else>
                        <input type="text" v-model="row.name" class="quickedit">
                        <button type="button" class="btn btn-info btn-xs quickedit-update"
                                @click="update(row.name);setEditing(false); uCampaignName(row)"><i
                                class="fas fa-check"></i></button>
                        <button type="button" class="btn btn-default btn-xs quickedit-cancel"
                                @click="revertValue(); setEditing(false)"><i class="fas fa-ban"></i></button>
                    </span>
                <b-form-text id="spent-values">
                    Updated {{timeSince_(row.dateUpdated)}} ago
                </b-form-text>
            </div>

            <div slot="budgetDaily" slot-scope="props">
                <span class="budget-daily">${{props.row.budgetDaily}}</span>
                <b-form-text id="spent-values">
                    Spent: ${{props.row.spentDaily || 0}}
                </b-form-text>
            </div>

            <div slot="budgetTotal" slot-scope="props">
                <span class="budget-total">${{props.row.budgetTotal}}</span>
                <b-form-text id="spent-values">
                    Spent: ${{props.row.spentTotal || 0}}
                </b-form-text>
            </div>

            <div slot="cpc" slot-scope="props">
                <span class="budget-daily">${{props.row.cpc}}</span>
                <b-form-text id="currency">
                    CAD
                </b-form-text>
            </div>

            <div slot="userName" slot-scope="props">
                <span v-if="props.row.userName.length<14" class="creator-name">{{props.row.userName}}</span>
                <span v-if="props.row.userName.length>=14" class="creator-name">{{ props.row.userName.substring(0,14)+"..." }}</span>
                <b-form-text id="date">
                    on {{ formatData_(props.row.dateAdded).substring(0,10) }}
                </b-form-text>
            </div>

            <div slot="landingPage" slot-scope="props">
              <span class="landing-page-box">
                <span class="landing-page-name" v-if="props.row.landingPage.length<14" @click="copyText(props.row.landingPage)">
                    {{ props.row.landingPage }}
                </span>
                <span class="landing-page-name" v-if="props.row.landingPage.length>=14" @click="copyText(props.row.landingPage)" v-b-tooltip.hover.html="props.row.landingPage">
                    {{ props.row.landingPage.substring(0,14)+"..." }}
                </span>
              </span>
                <button class="btn btn-link" @click="copyText(props.row.landingPage)"
                        v-b-tooltip.hover.right="'Copy URL to Clipboard'">
                    <i class="far fa-copy"></i>
                </button>
                <b-form-text id="date">
                    Clicks - Today: {{props.row.countClickDaily || 0}}
                </b-form-text>
            </div>

            <!-- Hide for now -->
            <!-- <div slot="child_row" slot-scope="props">
                <div class="segment-child animated fadeIn">

                </div>
            </div> -->

            <div slot="status" slot-scope="props">
                <span v-if="props.row.status == 'inactive'">
                <span class="status inactive">{{props.row.status}}</span>
                </span>
                <span v-else-if="props.row.status == 'active'">
                <span class="status active">{{props.row.status}}</span>
                </span>
                <!-- <span v-else-if="props.row.status == 'paused'">
                <span class="status paused">{{props.row.status}}</span>
                </span> -->
                <!-- <span v-else>
                <span class="status paused">{{props.formattedRow[props.row.status]}}</span>
                </span> -->
            </div>

            <div slot="clicks" slot-scope="props" class="text-center" width="10px">
                <span class="id">{{props.row.countClickTotal}}</span>
            </div>

            <div slot="actions" slot-scope="props">
                <button
                        class="btn btn-link"
                        v-b-tooltip.hover.top="'Edit Campaign'"
                        @click="edit(props.row)"
                >
                    <i class="fas fa-pencil"></i>
                </button>

                <button
                        class="btn btn-link"
                        v-b-tooltip.hover.top="'Delete Campaign'"
                        @click="del(props.row.id)"
                >
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>

        </v-client-table>

    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import {mapActions, mapState, mapGetters} from 'vuex'
    import logo from './logo.vue'
    import menunav from './menunav.vue'
    import {formatData, timeSince} from '../helpers'

    let tableColumnsLog = [
        'id',
        'name',
        'budgetDaily',
        'budgetTotal',
        'cpc',
        'userName',
        'landingPage',
        'clicks',
        'status',
        'actions',
    ]
    export default {
        // mounted() {
        //     this.getCampaigns()
        // },
        components: {logo, menunav},
        computed: {
            ...mapState('campaigns', ['campaigns']),
            ...mapGetters('campaigns', ['getCampaigns'])
        },
        methods: {
            async copyText(landingPage) {

                try {
                    await navigator.clipboard.writeText(landingPage);
                    this.$swal.fire({
                        type: 'success',
                        position: 'top-end',
                        title: `Copied URL: \n ${landingPage} \n   to clipboard `,
                        showConfirmButton: false,
                        timer: 2000
                    })
                } catch (err) {
                    console.error('Failed to copy: ', err);
                }
            },
            timeSince_(data) {
                return timeSince(new Date(Number(data)))
            },
            formatData_(data) {
                return formatData(data * 1000)
            },
            async uCampaignName(data) {

                let res = await this.$store.dispatch('campaign/updCampaignName', data)

                if (res.id) {
                    this.$swal.fire({
                        type: 'success',
                        position: 'top-end',
                        title: 'Campaign name has been updated',
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
            },
            edit(data) {
                this.$router.push(`/campaign/${data.id}`)
            },
            async del(id) {

                this.$swal.fire({
                    type: 'warning',
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    showCancelButton: true,
                    confirmButtonColor: '#FE5D65',
                    cancelButtonColor: '#ACC3CF',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        let self = this
                        this.$store.dispatch('campaigns/delCampaign', id).then((res) => {

                            if (res.id) {
                                self.$swal.fire({
                                    type: 'success',
                                    position: 'top-end',
                                    title: 'Campaign has been deleted',
                                    showConfirmButton: false,
                                    timer: 1000
                                })
                                location.reload()
                            } else {
                                self.$swal.fire({
                                    title: 'Error on backend ',
                                    text: 'Campaign has been not deleted.',
                                })
                            }
                        })
                    }
                })
            },
            addCampaign() {
                this.$swal.fire({
                    title: 'Add Campaign',
                    html:
                        `<label for="swal-input1"></label>
                        <input id="swal-input1" class="swal2-input" placeholder="Campaign Name" maxlength="25"
                             onblur="
                                 if(this.value === ''){
                                    alert('Enter campaign name ')
                                    document.querySelector('#swal-input1').style.background = '#f38282'
                                    document.querySelector('.swal2-confirm').style.display = 'none'
                                    return false
                                } else {
                                    document.querySelector('.swal2-confirm').style.display = 'inline-block'
                                    document.querySelector('#swal-input1').style.background = 'white'
                                }
                            "
                        >
                        <div class="row segment-popup">
                        <div class="col-md-6">
                    `,
                    confirmButtonColor: '#2ED47A',
                    cancelButtonColor: '#E3EEF4',
                    showCancelButton: true,
                    confirmButtonText: '<i class="fas fa-check"></i>',
                    cancelButtonText: '<i class="fas fa-times"></i>',
                    backdrop: `
                        rgba(0,0,123,0.2)
                    `,
                    preConfirm: () => {
                        if (document.getElementById('swal-input1').value
                        ) {
                            return [
                                document.getElementById('swal-input1').value
                            ]
                        } else {
                            this.$swal.fire({
                                title: 'Validation Error',
                                text: 'Please name your campaign.',
                            })
                            return
                        }

                    }

                }).then((result) => {
                    if (result.dismiss === "cancel") {
                        return
                    }

                    if (result.value[0]
                    ) {
                        let campaignData = {}
                        campaignData.name = result.value[0]
                        let self = this
                        self.campaignName = campaignData.name
                        this.$store.dispatch('campaign/addCampaign', campaignData).then((res) => {
                            let newCampaignId = res.id
                            self.$router.push(`/campaign/${newCampaignId}`)
                        })

                    } else {
                        this.$swal.fire({
                            title: 'Missing information',
                            type: 'error',
                            text: 'Please name your segment and try again.',
                            confirmButtonColor: '#2ED47A',
                        })
                    }

                })
            },
            // async getCampaigns() {
            //
            //     try {
            //         this.tableData = await this.campaigns
            //
            //     } catch (e) {
            //         console.log(e)
            //     }
            //
            // },
        },
        data() {
            return {
                segmentName: '',
                isModalVisible: false,
                eventData: [],
                editableColumns: ['name', 'budgetDaily'],
                columns: tableColumnsLog,
                tableData: [],
                countOfRecords: 0,
                options: {
                    // columnsDropdown: true,
                    headings: {
                        id: 'ID',
                        name: 'Campaign Name',
                        userName: 'Created by',
                        budgetDaily: 'Daily Budget',
                        budgetTotal: 'Total Budget',
                        cpc: 'Max. CPC',
                        landingPage: 'Landing Page URL',
                        status: 'Status',
                        clicks: 'Total Clicks'
                    },
                    editableColumns: ['name'],
                    // sortable: tableColumnsLog,
                    // sortable: [''],
                    sortable: ['id','name', 'userName', 'budgetDaily', 'budgetTotal', 'cpc', 'landingPage', 'status', 'clicks'],
                    sortIcon: {
                        base: 'fa fad',
                        up: 'fa-sort-up',
                        down: 'fa-sort-down',
                        is: 'fa-sort'
                    },
                    filterable: tableColumnsLog,
                    highlightMatches: true,
                    resizableColumns: false,
                    perPage: 10,
                    perPageValues: [5, 10, 25, 100],
                    pagination:{
                        virtual: true
                    },
                    texts: {
                        count: "Showing {from} to {to} of {count} campaigns|Showing {count} campaigns|Showing 1 campaign",
                        first: "First",
                        last: "Last",
                        filter: "Filter:",
                        filterPlaceholder: "Search...",
                        limit: "Show per page",
                        page: "Page:",
                        noResults: "No matching campaigns",
                        filterBy: "Filter by {column}",
                        loading: "Loading...",
                        defaultOption: "Select {column}"
                    },
                },
            }
        }
    }
</script>

<style lang="sass">
    .container
        margin-left: 300px
</style>