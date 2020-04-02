<template>
    <div id="edit-segment">
        <logo></logo>
        <h1>Rules &amp; Conditions</h1>
        <ul class="segment-info">
            <li>Campaign ID: <b>{{id}}</b></li>
            <li>Campaign Name: <b>{{this.$store.segmentName}}</b></li>
            <li>Campaign Rules Count: <b>{{this.segmentRuleCount}}</b></li>
        </ul>
        <conditions :segmentFilter="this.segmentFilter"/>
    </div>
</template>

<script>
    import conditions from './conditions.vue'
    import {mapState} from 'vuex'

    export default {
        name: 'edit-segment',
        components: {conditions},
        computed: {
            ...mapState('segment', ['segmentFilter']),
            ...mapState('segment', ['segmentRuleCount'])
        },
        segmentFilter: [],
        async mounted() {
            await this.$store.dispatch('segment/getSegmentConditions', this.id)
        },
        methods: {},
        data() {
            return {
                id: Number(this.$route.params.id)
            };
        }
    };
</script>
