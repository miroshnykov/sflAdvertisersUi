<template>
  <div class="container flex column jcsb">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "app"
  }
</script>

<style lang="sass">
  .container
    height: 100%
    min-height: 100vh
</style>
