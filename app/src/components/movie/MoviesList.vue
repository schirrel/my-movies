<template>
<section>

  <ul class="movie-list">
    <li v-for="(movie, index) in data" :key="index" @click="openMovieDetails($event, movie)">
      <div class="card">
        <div class="row movie-list-action">
          <div class="col-6">
            <button
              type="button"
              class="btn btn-link hover-red"
              title="Adicionar a Lista"
            >
              <i class="tim-icons icon-heart-2"></i>
            </button>
          </div>
          <div class="col-6">
            <button
              type="button"
              class="btn btn-link hover-yellow"
              title="Criar Lembrete"
            >
              <i class="tim-icons icon-time-alarm"></i>
            </button>
          </div>
        </div>
        <img :src="'https://image.tmdb.org/t/p/w200/' + movie.poster_path" />
        <div class="movie-title">
            {{ movie.title }}
          
        </div>
      </div>
    </li>
  </ul>
  
  <movie-details :movie="selected"></movie-details>
</section>
</template>

<script>

import MovieDetails from "@/components/modal/MovieDetails";
export default {
  name: "MovieList",
     components: {
    "movie-details": MovieDetails,
  },
  props: ["data"],
  data() {
    return {
      selected: null
    };
  },
  mounted() {},
  watch: {
    value() {},
  },
  methods: {
    openMovieDetails:function(event, movie) {
      event.preventDefault();
this.selected = movie.id;
    }
  },
};
</script>
<style scoped>
ul {
  display: flex;
  max-width: 90vw;
  overflow-x: scroll;
  list-style: none;
}
li {
  margin: 5px 15px;
  min-width: 150px;
  position: relative;
  cursor: pointer;
  pointer-events: all;
}

li .movie-list-action {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: auto;
  z-index: 99;
  text-align: center;
  padding: 5px;
  background: rgba(0, 0, 0, 0.5);
  margin: 0;
  transition: all 300ms ease;
}
li:hover .movie-list-action {
  opacity: 1;
}

li .movie-list-action .btn {
  padding: 0px !important;
  color: white;
  margin: 0px !important;
}
.hover-red:hover * {
  color: var(--red) !important;
}
.hover-yellow:hover * {
  color: var(--yellow) !important;
}
.movie-title {
  height: 40px;
  margin-top: -40px;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  font-weight: 700;
}
</style>
