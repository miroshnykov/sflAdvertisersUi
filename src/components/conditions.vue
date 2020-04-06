<template>
    <section class="segment-form__conditions">
        <div class="segment-buttons">
            <b-button  variant="primary" class="add-rule" @click="this.addFilter">
                <i class="fas fa-plus" data-fa-transform="shrink-2"></i> add line
            </b-button>

<!--            <div class="create-rule">-->
<!--                <section class="filter">-->
<!--                    <i class="fad fa-layer-plus fa-4x"></i>-->
<!--                    <p>Create a new rule to begin.</p>-->
<!--                </section>-->
<!--            </div>-->

<!--            <condition-filter-->
<!--                    v-for="(index) in this.campaign"-->
<!--                    :indexFilters="index-1"-->
<!--                    :key="index"-->
<!--            />-->

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
</template>

<script>
    import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
    // import {duplicate} from '../../helpers'
    import {deleteCookie, reFormatJSON} from '../helpers'

    // import ConditionFilter from './conditionFilter'

    export default {
        name: 'conditions',
        computed: {
            ...mapState('campaign', ['campaign']),
            ...mapGetters('campaign', ['getCampaign'])
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
                let res = await this.$store.dispatch('campaign/saveConditions',this)

                if (res.id){
                    this.$swal.fire({
                        type: 'success',
                        position: 'top-end',
                        title: 'Campaign data has been updated',
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
            },
            ...mapMutations('campaign', ['addFilter'])
        },
        // components: {ConditionFilter},
    }
</script>

<style lang="scss">
    .space {
        margin: 10px;
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
</style>
