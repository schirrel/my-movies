<template>
  <main id="app">
    <app-menu></app-menu>
    <!-- TODO Separar em outro componente -->
    <div class="loading-overlay" v-bind:class="{ hide: !loading}">
      <div class="spinner-border text-light" role="status">
        <span class="sr-only">Carregando...</span>
      </div>
      <h1 class="text-light ">Carregando</h1>
    </div>
    <router-view class="main-content container"></router-view>
  </main>
</template>

<script>
import Menu from "@/components/Menu";
import { watchRequest } from "@/services/Resources";
export default {
  name: "App",
  components: {
    "app-menu": Menu,
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    watchRequest((stillLoading) => {
      this.loading = stillLoading;
    });
  },
};
</script>

<style>

.loading-overlay {
  position: fixed;
  padding: 0;
  margin: 0;
  min-width: 100vw;
  min-height: 100vh;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: background 300ms ease;
  z-index: 99999;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.loading-overlay > * {
  z-index: 9999999;

}
.hide {
  background: transparent;
  opacity: 0;
  margin: 0;
  min-width: 0 !important;
  min-height: 0 !important;
  height: 0 !important;
  width: 0 !important;
  padding: 0;
  overflow: hidden;
}
.main-content {
  min-height: calc(100% - 150px);
}
main {
  min-height: 90vh;
}
</style>
