<template>
  <main id="app">
    <section class="app-container">
      <router-view></router-view>
    </section>
  <!-- Footer -->
<footer class="page-footer font-small bg-dark pt-4">

   <!-- Copyright -->
  <div class="footer-copyright text-center text-light  py-3">Versão {{version}} - Desenvolvido por
    <a href="https://schirrel.dev"> @schirrel</a>
  </div>
  <!-- Copyright -->

</footer>
<!-- Footer -->
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
