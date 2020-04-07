<template>
    <div id="campaigns">
        <logo></logo>
        <h1>Manage Campaigns </h1>

        <b-button variant="primary" class="margin-left-10" @click="this.addCampaign">
            <i class="fas fa-plus" data-fa-transform="shrink-2"></i> New Campaign
        </b-button>

        <v-client-table :data="getCampaigns" :columns="columns" :options="options">

            <div slot="name" slot-scope="{row, update, setEditing, isEditing, revertValue}">

              <span @click="edit(row)">
                  <span class="segment-name" @click="edit(row)">{{row.name}}</span>
              </span>

              <button @click="setEditing(true)" v-if="!isEditing()"  class="btn btn-link" >
                  <i class="fad fa-pencil"></i>
              </button>
                    <span v-else>
                        <input type="text" v-model="row.name">
                        <button type="button" class="btn btn-info btn-xs" @click="update(row.name);setEditing(false); uCampaignName(row)">Update</button>
                        <button type="button" class="btn btn-default btn-xs" @click="revertValue(); setEditing(false)">Cancel</button>

                    </span>
            </div>

            <div slot="child_row" slot-scope="props">
                <div class="segment-child animated fadeIn">

                </div>
            </div>


            <div slot="actions" slot-scope="props">

                <button
                        class="btn btn-link"
                        v-b-tooltip.hover.top="'Edit Campaign'"
                        @click="edit(props.row)"
                >
                    <i class="fad fa-tasks"></i>
                </button>

                <button
                        class="btn btn-link"
                        v-b-tooltip.hover.top="'Delete Campaign'"
                        @click="del(props.row)"
                >
                    <i class="far fa-trash-alt"></i>
                </button>


            </div>

        </v-client-table>

    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import {mapActions, mapState, mapGetters} from 'vuex'
    import logo from './logo.vue'
    import {formatData} from '../helpers'

    let tableColumnsLog = [
        'id',
        'name',
        'budgetTotal',
        'budgetDaily',
        'cpc',
        'user',
        'landingPage',
        'status',
        'actions'
    ]
    export default {
        // mounted() {
        //     this.getCampaigns()
        // },
        components: {logo},
        computed: {
            ...mapState('campaigns', ['campaigns']),
            ...mapGetters('campaigns', ['getCampaigns'])
        },
        methods: {
            async uCampaignName(data){

                let res = await this.$store.dispatch('campaign/updCampaignName',data)

                if (res.id){
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
            del(data) {
                console.log('delete campaign ', data)
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
                editableColumns:['name','budgetDaily'],
                columns: tableColumnsLog,
                tableData: [],
                countOfRecords: 0,
                options: {
                    // columnsDropdown: true,
                    headings: {

                        id: 'Id',
                        name: 'name Id',
                        budgetTotal: 'budget Total',
                        budgetDaily: 'budget Daily',
                        cpc: 'cpc',
                        user: 'user',
                        landingPage: 'landingPage',
                        status: 'status'
                    },
                    editableColumns:['name'],
                    sortable: tableColumnsLog,
                    filterable: tableColumnsLog,
                    highlightMatches: true,
                },
            }
        }
    }
</script>