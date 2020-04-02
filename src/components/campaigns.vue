<template>
    <div id="campaigns">
        <logo></logo>
        <h1>Manage Campaigns </h1>

        <b-button variant="primary" class="margin-left-10" @click="this.addCampaign">
            <i class="fas fa-plus" data-fa-transform="shrink-2"></i> New Campaign
        </b-button>

        <v-client-table :data="getCampaigns" :columns="columns" :options="options">
            <div slot="name" slot-scope="props">
              <span @click="editSegment(props.row)">
                  <span class="segment-name" @click="editSegment(props.row)">{{props.row.name}}</span>
              </span>
            </div>

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
        'status'
    ]
    export default {
        // mounted() {
        //     this.getCampaigns()
        // },
        components: {logo},
        computed: {
            ...mapState('campaigns', ['campaigns']),
            ...mapGetters('campaigns', ['getCampaigns']),
        },
        methods: {
            editSegment(data) {
                this.$router.push(`/campaign/${data.id}`)
            },
            addCampaign() {
                this.$swal.fire({
                    title: 'Add Campaign',
                    html:
                        `<label for="swal-input1"></label>
                        <input id="swal-input1" class="swal2-input" placeholder="Segment Name" maxlength="25"
                             onblur="
                                 if(this.value === ''){
                                    alert('Enter segment name ')
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
                        <label for="swal-input1">Quality Score<br><strong>(80 - 100)</strong></label>
                        <input
                            type="number" step="1" min="80" max="100"
                            id="swal-input2"
                            class="swal2-input"
                            value="100"
                            onkeypress="
                                return (
                                    event.charCode == 8
                                    || event.charCode == 0
                                    || event.charCode == 13
                                ) ? null : event.charCode >= 48 && event.charCode <= 57"
                            onpaste="return false"
                            onkeyup="
                                if(this.value === '' || parseInt(this.value)>100){
                                    this.value = 100
                                    return false
                                }
                            "
                            onblur="
                                 if(this.value === ''|| parseInt(this.value)<80 || parseInt(this.value)>100){
                                    alert('range between 80 and 100 default 100')
                                    document.querySelector('#swal-input2').style.background = '#f38282'
                                    document.querySelector('.swal2-confirm').style.display = 'none'
                                    return false
                                } else {
                                    document.querySelector('#swal-input2').style.background = 'white'
                                    document.querySelector('.swal2-confirm').style.display = 'inline-block'
                                }
                            "
                        >
                        </div>

                        <div class="col-md-6">
                        <label for="swal-input3">Multiplier<br><strong>(0.5 - 1.5)</strong></label>
                        <input type="number" step="0.1" min="0.5" max="1.5" id="swal-input3" class="swal3-input"
                            value="1"
                            onkeypress="
                                return (
                                    event.charCode == 8
                                    || event.charCode == 0
                                    || event.charCode == 13
                                ) ? null : event.charCode >= 48 && event.charCode <= 57
                            "
                            onpaste="return false"
                            onkeyup="
                                if(
                                    this.value === ''
                                    || parseFloat(this.value)<0.5
                                    || parseFloat(this.value)>1.5
                                ){
                                    this.value = 1
                                    return false
                                }
                            "
                            onblur="
                                 if(this.value === ''
                                    || parseFloat(this.value)>1.5
                                 ){
                                    alert('range between 0.5 and 1.5 default 1')
                                    document.querySelector('#swal-input3').style.background = '#f38282'
                                    document.querySelector('.swal2-confirm').style.display = 'none'
                                    return false
                                 } else {
                                    document.querySelector('#swal-input3').style.background = 'white'
                                    document.querySelector('.swal2-confirm').style.display = 'inline-block'
                                 }
                             "
                        >
                        </div>
                        </div>
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
                            && document.getElementById('swal-input2').value
                            && document.getElementById('swal-input3').value
                        ) {
                            let sName = document.getElementById('swal-input1').value
                            let duplicateName = this.getSegmentsStore.filter(item => (item.name === sName))
                            if (duplicateName.length > 0) {
                                this.$swal.fire({
                                    title: 'Validation Error',
                                    text: 'Name already exists',
                                })
                            }

                            return [
                                document.getElementById('swal-input1').value,
                                document.getElementById('swal-input2').value,
                                document.getElementById('swal-input3').value
                            ]
                        } else {
                            this.$swal.fire({
                                title: 'Validation Error',
                                text: 'Please name your segment.',
                            })
                            return
                        }

                    }

                }).then((result) => {
                    if (result.dismiss === "cancel") {
                        return
                    }

                    if (result.value[0]
                        && result.value[1]
                        && result.value[2]
                    ) {
                        let segmentData = {}
                        segmentData.name = result.value[0]
                        segmentData.weight = result.value[1]
                        segmentData.multiplier = result.value[2]
                        let self = this
                        self.segmentName = segmentData.name
                        this.$store.dispatch('segment/createSegment', segmentData).then((res) => {
                            let newSegmentId = res.data.data.createSegment.id
                            self.$store.segmentName = self.segmentName
                            self.$router.push(`/segment/${newSegmentId}`)
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
                    sortable: tableColumnsLog,
                    filterable: tableColumnsLog,
                    highlightMatches: true,
                },
            }
        }
    }
</script>