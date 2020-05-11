<template>
    <transition name="expand-down">

        <!-- <h3 class="filter__title">Rule: <b></b></h3> -->
        <div class="filter__controls">

            <b-row class="text-center">
                <b-col cols="10">
                    <h2>Targeting</h2>
                </b-col>
                <b-col cols="2">
                    <b-button variant="secondary" class="btn-add-line" @click="addTargeting">
                        <i class="fas fa-plus"></i> Add Line
                    </b-button>
                </b-col>
            </b-row>

            <template v-for="item in getTargeting">

                        <span
                                :id="setElIdByPosition(`condition`,item.position)"
                                class="condition__controls"
                        >
                        <!-- TODO: Turn exclude/include into switch buttons -->
                            <!-- <b-form-checkbox switch size="lg">{{ checked }}</b-form-checkbox> -->
                            <!-- <b-form-checkbox
                                    class="active"
                                    name="check-button"
                                    :checked="props.row.status==='active'"
                                    @change="activeInactiveSwitch($event, props.row)"
                                    switch>
                            </b-form-checkbox> -->

                    <b-row align-v="center">
                        <b-col cols="2">
                            <div class="campaign-block">
                                <label for="label-filter">&nbsp;</label>
                                <select
                                        class="condition__dimension-name condition__matches custom-select"
                                        @change="changeFilterType($event, item)"
                                        :id="setElIdByPosition(`filtertype`,item.position)"
                                        disabled
                                >

                                  <option
                                          id="filterType"
                                          v-for="{id, name} in getFilterList()"
                                          :value="id"
                                          :selected="id === item.filterTypeId"
                                          :key="id"
                                  >{{name}}
                                  </option>

                                </select>
                            </div>
                        </b-col>
                        <b-col cols="4">
                            <div class="campaign-block">
                                <label for="label-country">Country</label>
                                <model-select
                                        :options="getCountriesModify()"
                                        :id="setElIdByPosition(`country`,item.position)"
                                        @input="changeInput($event, item, `geo`)"
                                        class="condition__country condition__matches custom-select "
                                        :value="item.geo"
                                >
                                </model-select>
                            </div>
                        </b-col>
                        <b-col cols="3">
                            <div class="campaign-block">
                                <label for="label-platform">Platform</label>
                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                  <label class="btn btn-secondary-" :class="addClassActive(item.platformAndroid)">
                                    <input
                                            type="checkbox"
                                            autocomplete="off"
                                            @change="updateValue(item,`platformAndroid`)"
                                    > Android
                                  </label>

                                  <label class="btn btn-secondary-" :class="addClassActive(item.platformIos)">
                                    <input
                                            type="checkbox"
                                            autocomplete="off"
                                            @change="updateValue(item,`platformIos`)"
                                    > IOS
                                  </label>

                                  <label class="btn btn-secondary-" :class="addClassActive(item.platformWindows)">
                                    <input
                                            type="checkbox"
                                            autocomplete="off"
                                            @change="updateValue(item,`platformWindows`)"
                                    > Windows
                                  </label>
                                </div>
                            </div>
                        </b-col>
                        <b-col cols="2">
                            <div class="campaign-block">
                                <label for="label-platform">Source Type</label>
                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                  <label class="btn btn-secondary-" :class="addClassActive(item.sourceTypeSweepstakes)">
                                    <input
                                            type="checkbox"
                                            autocomplete="off"
                                            @change="updateValue(item,`sourceTypeSweepstakes`)"
                                    > Sweepstakes
                                  </label>

                                  <label class="btn btn-secondary-" :class="addClassActive(item.sourceTypeVod)">
                                    <input
                                            type="checkbox"
                                            autocomplete="off"
                                            @change="updateValue(item,`sourceTypeVod`)"

                                    > VOD
                                  </label>
                                </div>
                            </div>
                        </b-col>
                        <b-col cols="1" align-self="center">
                            <div class="cpc-equal"><i class="fas fa-equals"></i></div>
                        </b-col>
                        <b-col cols="2">
                            <label for="label-cpc">Max. CPC <a class="question" v-b-tooltip.hover.right="'Cost per click'">
                                <i class="fad fa-question-circle"></i></a></label>
                            <div class="campaign-block">
                                <input type="number"
                                       step=0.1
                                       readonly
                                       placeholder="0.1"
                                       :id="setElIdByPosition(`cpc`,item.position)"
                                       class="condition__matches custom-input"
                                       @change="changeInput(Number($event.target.value), item, `cpc`)"
                                       :value="item.cpc"
                                       style="width:50%;float:left;"
                                       min="0.001" max="1000"
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
                                >
                            </div>
                            <div class="condition-button-delete">
                                  <button
                                          type="button"
                                          class="remove_condition"
                                          @click="removeTargetingItem(item.position)"
                                          variant="danger"
                                          v-b-tooltip.hover.top="'Delete'"
                                  >
                                    <i class="fas fa-times"></i>
                                  </button>
                            </div>
                        </b-col>
                    </b-row>


                        </span>

            </template>

            <span class="space"></span>
            <!-- <b-button class="btn-back" variant="light" @click="this.mainPage"
                      v-b-tooltip.hover.right="'Note: Unsaved changes will be cancelled'">
                <i class="fad fa-arrow-left"></i> Manage Campaign
            </b-button> -->
            <b-button class="btn-save" @click="this.saveConditions">
                Save Changes
            </b-button>
        </div>

    </transition>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import {deleteCookie, reFormatJSON} from '../helpers'
    import {ModelSelect} from 'vue-search-select'


    export default {
        name: 'targeting',
        computed: {
            ...mapGetters('targeting', ['getTargeting', 'getCampaignId']),
            ...mapGetters('campaign', ['getCampaign']),
            ...mapGetters('countries', ['getCountries']),
            ...mapGetters('publisherTargeting', ['getPublisherTargeting']),
            // ...mapMutations("targeting", ["removeTargeting"])
        },
        data() {
            return {
                loading: true,
                // checked: [true],
            }
        },
        // mounted() {
        //     this.loadingDone()
        // },
        methods: {
            ...mapMutations('targeting', ['addTargeting', 'saveTargetingItem', 'removeTargetingItem']),
            async updateValue(item, field) {
                item.field = field
                item.fieldValue = !item[field]
                this.saveTargetingItem(item)
                this.matchTargeting(item)
            },
            addClassActive(value) {
                return value && 'active' || ''
            },
            setElIdByPosition(value, position) {
                return `${value}-${position}`
            },
            changeFilterType(event, item) {
                item.filterTypeId = Number(event.target.value)
            },
            getFilterList() {
                return [
                    {id: 0, name: 'Include'},
                    {id: 1, name: 'Exclude'}
                ]
            },
            changeInput(value, item, field) {

                if (!this.validateItem(value, item, field)) return

                item.field = field
                item.fieldValue = value

                this.saveTargetingItem(item)
                if (field === 'geo') {
                    this.matchTargeting(item)
                }

            },
            matchTargeting(item) {
                let matchConditions = this.compareTargeting(this.getPublisherTargeting, item)
                item.cpc = 0
                if (matchConditions.length > 0) {
                    item.cpc = matchConditions[0].cpc
                }

            },
            compareTargeting(pub, adv) {

                pub = pub.map(item => {
                    return {
                        targetingId: item.id,
                        cpc: item.cpc,
                        geo: item.geo,
                        platformAndroid: item.platformAndroid,
                        platformIos: item.platformIos,
                        platformWindows: item.platformWindows,
                        sourceTypeSweepstakes: item.sourceTypeSweepstakes,
                        sourceTypeVod: item.sourceTypeVod
                    }
                })
                let advItem = {}
                advItem.geo = adv.geo
                advItem.platformAndroid = adv.platformAndroid
                advItem.platformIos = adv.platformIos
                advItem.platformWindows = adv.platformWindows
                advItem.sourceTypeSweepstakes = adv.sourceTypeSweepstakes
                advItem.sourceTypeVod = adv.sourceTypeVod

                if (pub.length === 0) return []
                let findRecords = []
                pub.forEach(pub_ => {
                    const targetingAdv = pub_.targetingId
                    const cpcAdv = pub_.cpc

                    let advCheck = advItem
                    let pubCheck = pub_
                    delete pubCheck.targetingId
                    delete pubCheck.cpc
                    if (JSON.stringify(advCheck) === JSON.stringify(pubCheck)) {
                        pub_.targetingId_ = targetingAdv
                        pub_.cpc = cpcAdv
                        findRecords.push(pub_)
                    }


                })
                return findRecords
            },
            getCountriesModify() {
                return this.getCountries.map(item => {
                    item.value = item.code
                    item.text = item.name + ' (' + item.code + ') '
                    return item
                })
            },
            // loadingDone() {
            //     let self = this
            //     setTimeout(() => {
            //         self.loading = false
            //     }, Number(self.segmentRuleCount + 1) * 100)
            // },
            // activeInactiveSwitch(status, item) {

            //     this.$nextTick(async () => {
            //         await segmentsApi.updateStatusSegment(item.id, status && 'active' || 'inactive')
            //         location.reload()
            //     })
            // },
            mainPage() {
                this.$router.push('/campaigns')
                location.reload()
            },
            loginOut() {
                deleteCookie('accessToken')
                this.$router.push(`/`)
                location.reload()
            },
            validateItem(value, item, field) {
                let el = document.querySelector(`#${field}-${item.position}`)
                let elCondition = document.querySelector(`#condition-${item.position}`)
                if (Number(value) === 0) {
                    el && el.classList.add('error')
                    elCondition && elCondition.classList.add('errorCondition')
                    return
                } else {
                    el && el.classList.remove('error')
                    elCondition && elCondition.classList.remove('errorCondition')
                }
                return true
            },
            validate() {
                let checkTargeting = this.getTargeting
                let campaignId = this.getCampaignId
                let checkCampaign = this.getCampaign

                let emptyKey = []
                checkCampaign.forEach(item => {
                    let keys = Object.keys(item)
                    keys.forEach(key => {
                        if (
                            key === 'landingPageValid' ||
                            key === 'spentDaily' ||
                            key === 'spentTotal' ||
                            key === 'countClickTotal' ||
                            key === 'countClickDaily'
                        ) {
                            return
                        }
                        if (Number(item[key]) === 0) {
                            emptyKey.push(key)
                        }
                    })
                })

                if (emptyKey.length > 0) {
                    emptyKey.forEach(key => {
                        let el = document.querySelector(`#${key}-${campaignId}`)
                        el && el.classList.add('error')
                    })
                    this.$swal.fire({
                        title: 'Validation Error',
                        text: `Please check fields: ${JSON.stringify(emptyKey)}`,
                    })
                    return
                }

                let checkEmptyValue = checkTargeting.filter(item => {
                    if (item.geo === ''
                        || Number(item.cpc) === 0
                    ) {
                        return item
                    }
                })
                console.log(' >>> validate checkEmptyValue:')
                console.table(reFormatJSON(checkEmptyValue))

                checkEmptyValue.forEach(item => {

                    let el = document.querySelector(`#condition-${item.position}`)
                    el && el.classList.add('errorCondition')
                })
                if (checkEmptyValue.length > 0) {
                    this.$swal.fire({
                        type: 'error',
                        title: 'Missing Data',
                        text: 'Some fields were not selected, please try again.',
                        footer: ''
                    })
                    return
                }
                return true
            },
            async saveConditions() {
                if (!this.validate()) return
                let saveConditionsResponse = await this.$store.dispatch('campaign/saveConditionsAction')
                let saveTargetingDbResponse = await this.$store.dispatch('targeting/saveTargetingDb', this)

                if (saveConditionsResponse.id && saveTargetingDbResponse) {
                    this.$swal.fire({
                        type: 'success',
                        position: 'top-end',
                        title: 'Campaign targeting has been saved',
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
            },
        },
        components: {ModelSelect},
    }
</script>