<template>
    <transition name="expand-down">
        <section class="filter">
            <h3 class="filter__title">Rule: <b></b></h3>
            <div class="filter__controls">
                <b-button variant="secondary" @click="addTargeting">
                    <i class="fas fa-history"></i> add line
                </b-button>

                <template v-for="item in this.targeting">

                        <span class="condition__controls">

                            <div class="campaign-block">
                                <select
                                        class="condition__dimension-name condition__matches custom-select"
                                        @change="handleFilterType($event, item)"
                                        :ref="defineFilterType(item.position)"
                                >

                                  <!-- <option :value="null">-- Select Filter --</option> -->
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

                            <div class="campaign-block">

                                <model-select
                                        :options="getCountriesModify()"
                                        @input="changeCountry($event, item)"
                                        class="condition__country condition__matches custom-select "
                                        :value="item.geo"
                                >
                                </model-select>
                                <label for="label-country">Country</label>

                            </div>

                            <div class="campaign-block">
                                <input type="text"
                                       placeholder="platform"
                                       class="condition__matches custom-input"
                                       :value="item.platform"
                                >
                                <label
                                        for="label-platform">platform</label>
                            </div>

                            <div class="campaign-block">
                                <input type="text"
                                       placeholder="sourceType"
                                       class="condition__matches custom-input"
                                       :value="item.sourceType"
                                >
                                <label
                                        for="label-platform">sourceType</label>
                            </div>

                            <div class="campaign-block">
                                <input type="text"
                                       placeholder="cpc"
                                       class="condition__matches custom-input"
                                       @change="changeCpc($event, item)"
                                       :value="item.cpc"
                                >
                                <label
                                        for="label-cpc">cpc</label>
                            </div>


                            <div class="condition-button-delete">
                                  <button
                                          type="button"
                                          class="remove_condition"
                                          @click="rmTargeting(item)"
                                          variant="danger"
                                          v-b-tooltip.hover.top="'Delete '"
                                  >
                                    <i class="fas fa-times"></i>
                                  </button>
                            </div>

                            <div class="_or"><span></span></div>

                        </span>


                </template>


                <span class="space"></span>
                <b-button class="btn-back" variant="light" @click="this.mainPage"
                          v-b-tooltip.hover.right="'Note: Unsaved changes will be cancelled'">
                    <i class="fad fa-arrow-left"></i> Manage Campaign
                </b-button>
                <b-button class="btn-save" @click="this.saveConditions">
                    <i class="fad fa-save"></i> Save Changes
                </b-button>
            </div>

        </section>
    </transition>
</template>

<script>
    import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
    // import {duplicate} from '../../helpers'
    import {deleteCookie, reFormatJSON} from '../helpers'
    import {ModelSelect} from 'vue-search-select'

    // import ConditionFilter from './conditionFilter'

    export default {
        name: 'conditions',
        computed: {
            ...mapState('targeting', ['targeting']),
            ...mapGetters('targeting', ['getTargeting']),
            ...mapGetters('countries', ['getCountries']),
            // ...mapMutations("targeting", ["removeTargeting"])
        },
        data() {
            return {
                loading: true,
            }
        },
        // mounted() {
        //     this.loadingDone()
        // },
        methods: {
            async rmTargeting(item) {
                await this.$store.dispatch('targeting/rmTargetingItem', item.position)
            },
            async addTargeting() {
                await this.$store.dispatch('targeting/newTargetingStore', this.$store.state.targeting.targeting)
            },
            defineFilterType(id) {
                return `filtertype-${id}`
            },
            handleFilterType(event, item) {
                let matchTypeRef = `matchtype-${item.position}`
                item.filterTypeId = Number(event.target.value)
                // item.matchTypeId = this.$refs[matchTypeRef] && Number(this.$refs[matchTypeRef][0].value)
            },
            getFilterList() {
                return [
                    {id: 0, name: 'Include'},
                    {id: 1, name: 'Exclude'}
                ]
            },
            changeCountry(event, item) {
                item.geo = event
            },
            changeCpc(event, item) {
                item.cpc = event.target.value
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
            mainPage() {
                this.$router.push('/campaigns')
            },
            loginOut() {
                deleteCookie('accessToken')
                this.$router.push(`/`)
                location.reload()
            },
            async saveConditions() {
                // if (!this.validate()) return
                let saveConditionsResponse = await this.$store.dispatch('campaign/saveConditions', this)
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
            ...mapMutations('campaign', ['addFilter'])
        },
        components: {ModelSelect},
    }
</script>

<style lang="scss">
    .space {
        margin: 10px;
    }

    .campaign-block {
        float: left;
        margin-right: 10px;
    }

    .filter__controls {
        display: grid;
        // margin-bottom: 2rem;
        justify-content: space-between;
    }

    .condition-group {
        .and {
            color: #999;
            display: flex;
            text-align: left;
            padding: 1rem 0;
            align-items: center;

            &:after {
                content: "";
                height: 1px;
                width: 100%;
                margin-left: 0.5rem;
                background: currentcolor;
                display: inline-block;
            }
        }
    }

    .filter {
        border: none;
        margin-top: 1rem;
        padding: 1rem;
        min-width: 920px;
        border-radius: 10px;
        // overflow: hidden;
    }

    .filter__title {
        left: 50%;
        margin: 5px 0px;
        position: absolute;
        color: rgba(255, 255, 255, 0.5);
        font-size: 14px;
        letter-spacing: 1px;
        font-weight: 500;
        transform: translate(-50%, 0);
    }


    .condition__controls {
        flex-grow: 1;
        text-align: left;
        margin-left: 1rem;
        margin-top: 0;
        margin-bottom: 0;
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        min-width: 990px;
    }

    .condition__controls:last-child {
        border: 0;
        margin-top: 0rem;
        margin-bottom: 1rem;
        padding-bottom: 0rem;
    }

    .segment-form__conditions {
        .add-filter {
            width: 200px;
            margin: 2rem;
        }

        .save {
            width: 200px;
            margin: 2rem;
        }

        .button--fill:disabled {
            opacity: 0;
            cursor: initial;
        }

    }

    .condition__matches {
        text-align: right;
        margin-right: 1px;
    }

    /* The container must be positioned relative: */
    .custom-select {
        text-align: left;
        position: relative;
        width: auto;
        min-width: 50px;
        max-width: 280px;
        border-radius: 4px;
        color: #555;
        border: 1px solid transparent;
        -webkit-transition: all 0.3s ease;
        -o-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        -ms-transition: all 0.3s ease;
        transition: all 0.3s ease;
        -webkit-appearance: none;
        -moz-appearance: none;
        background: url("data:image/svg+xml;utf8,<svg fill='grey' height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>") #fff;
        background-repeat: no-repeat;
        background-position-x: 99%;
        background-position-y: 7px;
    }

    .custom-select:hover, .custom-select:focus,
    .custom-input:hover, .custom-input:focus,
    .ui.search.selection.dropdown > input.search:hover, .ui.search.selection.dropdown > input.search:focus {
        border-color: #36B8E1 !important;
        box-shadow: 0 0 5px #36B8E1 !important;
        cursor: pointer !important;
    }

    .custom-select:disabled:hover {
        border-color: transparent;
        box-shadow: 0 0 5px transparent;
    }

    .ui.search.dropdown > .text {
        top: -1px;
        padding-right: 10px;
    }

    .ui.search.dropdown {
        min-width: 160px;
        max-width: 280px;
    }

    .ui.search.selection.dropdown > input.search, .ui.search.selection.dropdown > span.sizer {
        line-height: 1.21428571em;
        padding: .5em 2.1em .5em 1em;
    }

    .ui.dropdown > .dropdown.icon:before {
        content: '' !important;
    }

    .custom-select:before {
        content: '\f11c';
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        font-size: 16px;
        color: lightgrey;
        float: right;
        margin-top: -2px;
        margin-right: -20px;
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

    select.add-condition.custom-select {
        color: #7F98A5;
        font-weight: 600;
        border: 2px solid #7F98A5;
        //background-color: rgba(255, 255, 255, 0.1);
        background-color: #E3EEF4;
    }

    .custom-select select {
        display: none; /*hide original SELECT element: */
    }

    .select-selected {
        background-color: DodgerBlue;
    }

    .custom-select:disabled {
        color: #6c757d;
        background-color: #e9ecef;
        opacity: 0.5;
    }

    /* Style the arrow inside the select element: */
    .select-selected:after {
        position: absolute;
        content: "";
        top: 14px;
        right: 10px;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-color: #fff transparent transparent transparent;
    }

    /* Point the arrow upwards when the select box is open (active): */
    .select-selected.select-arrow-active:after {
        border-color: transparent transparent #fff transparent;
        top: 7px;
    }

    /* style the items (options), including the selected item: */
    .select-items div, .select-selected {
        color: #ffffff;
        padding: 8px 16px;
        border-radius: 50px;
        border: 1px solid transparent;
        border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
        cursor: pointer;
    }

    /* Style items (options): */
    .select-items {
        position: absolute;
        background-color: DodgerBlue;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 99;
    }

    /* Hide the items when the select box is closed: */
    .select-hide {
        display: none;
    }

    .select-items div:hover, .same-as-selected {
        background-color: rgba(0, 0, 0, 0.1);
    }

    /* Or - And Conditions */
    ._or {
        display: block
    }

    ._or span {
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 1px;
        padding-right: 8px;
        text-transform: uppercase;
    }

    ._and {
        /*border-bottom: 2px solid #9194aa;*/
        /*line-height: 0;*/
        /*margin: 10px 0;*/
        display: block;
        position: relative;
        top: 40px;
        left: 14px;
    }

    ._and span {
        /*background-color: #656a89;*/
        // color: #9194aa;
        color: rgba(255, 255, 255, 0.8);
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 1px;
        padding-right: 8px;
        text-transform: uppercase;
    }
</style>
