<template>
  <main id="app">
    <section class="app-container">
      <router-view></router-view>
    </section>
  </main>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      version: process.env.PACKAGE_VERSION || '0.0.0'
    };
  },
};
</script>

<style>

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main,
section {
  position: relative;
  margin: 0px;
}
.container {
  margin: 15px 5px;
}
</style>
