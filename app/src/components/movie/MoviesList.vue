<template>
  <section>
    <ul class="movie-list">
      <li v-for="(movie, index) in data" :key="index">
        <div class="card">
          <div class="movie-list-action">
            <button
              type="button"
              class="btn btn-link hover-red"
              title="Adicionar a Lista"
              @click="addToWatchList($event, movie)"
            >
              <i class="tim-icons icon-heart-2"></i>
            </button>
             <button
              type="button"
              class="btn btn-link"
              title="Sinalizar como assistido"
            @click="setWatched($event, movie)"
            >
              <i class="tim-icons icon-check-2"></i>
            </button>
            <button
              type="button"
              class="btn btn-link hover-yellow"
              title="Criar Lembrete"
            @click="createReminder($event, movie)"
            >
              <i class="tim-icons icon-time-alarm"></i>
            </button>
          </div>
          <div
            class="card-body movie-item-content"
            @click="openMovieDetails($event, movie)"
          >
            <img
              :src="'https://image.tmdb.org/t/p/w200/' + movie.poster_path"
            />
            <div class="movie-title">
              {{ movie.title }}
            </div>
          </div>
        </div>
      </li>
    </ul>

    <movie-details :movie="selected" :profile="profile"></movie-details>
    <movie-reminder :movie="toReminde" :profile="profile"></movie-reminder>
  </section>
</template>

<script>
import MovieDetails from "@/components/modal/MovieDetails";
import Reminder from "@/components/modal/Reminder";
import { $movie } from "@/services/Resources";
import Storage from "@/utils/Storage";
export default {
  name: "MovieList",
  components: {
    "movie-details": MovieDetails,
    "movie-reminder": Reminder,
  },
  props: ["data"],
  data() {
    return {
      selected: null,
      profile: null,
      toReminde: null
    };
  },
  mounted() {
    let vueInstance = this;
    Storage.get("my-movie-profile").then((res) => {
      vueInstance.profile = res.id;
    });
  },
  watch: {
    value() {},
  },
  methods: {
    createReminder: function (event, movie) {
      event.preventDefault();
      this.toReminde = movie.id;
    },
    openMovieDetails: function (event, movie) {
      event.preventDefault();
      this.selected = movie.id;
    },
    setWatched: async function  (event, movie){
     event.preventDefault();
     await $movie.watched(movie.id);
     this.$toast.success("Pronto,. agora sabemos que você assistiu!");
    },
    addToWatchList(event, movie) {
      event.preventDefault();
      let listed = {
        movie: movie.id,
        genres: movie.genre_ids,
        profile: this.profile,
      };

      $movie
        .create(listed)
        .then((res) => {
          movie.list = res;
          this.$toast.success("Filme adicionado a sua lista");
        })
        .catch((err) => {
          this.$toast.error(err.response.data || err.message);
        });
    },
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
  display: flex;
    justify-content: space-around;
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
  position: relative;
}
.movie-item-content {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0 !important;
  height: 100%;
}
</style>
