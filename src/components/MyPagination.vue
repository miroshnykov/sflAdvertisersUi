<template>
    <v-pagination v-model="props.page"
                  :page-count="props.totalPages"
                  @input="page => props.setPage(page)"/>
</template>

<script>
    import vPagination from 'vue-plain-pagination'

    export default {
        name: "VtPagination",
        components: {
            vPagination
        },
        props: ['props']
    }
</script>