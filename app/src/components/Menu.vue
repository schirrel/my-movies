<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="#">Mercado Alencar</a>

  <ul class="navbar-nav">
      <li class="nav-item">  
          <router-link class="nav-link" to="/venda">Venda </router-link>      
      </li>
       <li class="nav-item">  
          <router-link class="nav-link" to="/sorteio">Sorteio </router-link>      
      </li>
       <li class="nav-item">
        <router-link class="nav-link" to="/entregas">Entregas </router-link>
        </li>
      <!-- <li class="nav-item">
         <router-link class="nav-link" to="/rotas">Rotas </router-link>
      </li> -->
    </ul>
</nav>
</template>

<script>
export default {
  name: "Menu",
  mounted() {

  },
  data() {
    return {};
  },
};
</script>

<style>

.navbar-dark .navbar-nav .nav-link {
color: white !important;
    font-weight: 700;
}

.navbar-dark .navbar-nav .nav-link {
    border-bottom: 2px solid transparent;
    transition: all 300ms;
    font-size: 1.3rem;
    margin-left: 20px;
}


.navbar-dark .navbar-nav .nav-link:hover {
    color: black;
    border-color: white
}

.navbar-nav {
    margin-left: auto;
}
</style>
