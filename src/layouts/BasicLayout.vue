<template>
  <div class="basic-layout">
    <app-nav></app-nav>
    <app-view></app-view>
  </div>
</template>

<script>
    import AppNav from '../components/AppNav';
    import AppView from '../components/AppView';

    export default {
        name: "BasicLayout",
        components: {
          AppNav,
          AppView
        },
    }
</script>

<style scoped>

</style>
