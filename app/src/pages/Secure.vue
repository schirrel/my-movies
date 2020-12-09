<template>
  <main id="app">
    <navbar></navbar>
    
      <section class="app-container">
       <router-view></router-view>
      
    </section>
  </main>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",
 components: {
    "navbar": Navbar,
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
   
  },
};
</script>

<style>
.app-container {
  margin-top: 100px;
  min-height: calc(100vh - 120px);
}
</style>

