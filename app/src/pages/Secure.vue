<template>
  <main id="app">
    <loading> </loading>
    <div class="wrapper">
      <div class="page-header">
        <navbar v-if="showNavbar"></navbar>
      </div>

      <div class="content">
        <div class="container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
export default {
  name: "App",
  components: {
    navbar: Navbar,
    loading: Loading,
  },
  data() {
    return {};
  },
  computed: {
    showNavbar() {
      return this.$route.name !== "secure.profile";
    },
  },
  mounted() {},
};
</script>

<style>
.app-container {
  /* margin-top: 100px;
  min-height: calc(100vh - 120px); */
}
.page-header {
  height: 100px !important;
  min-height: 100px !important;
}
</style>

