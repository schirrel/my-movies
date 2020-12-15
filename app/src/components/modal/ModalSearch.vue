<template>
  <div v-if="showModal">
    <transition name="modal-fade">
      <div
        class="modal modal-search fade show"
        id="modal-search-modal"
        tabindex="-1"
        role="dialog"
        @keyup.esc="close"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <input
                @keyup.enter="SearchMovie($event, searchedText)"
                type="text"
                class="form-control"
                id="inlineFormInputGroup"
                v-model="searchedText"
                placeholder="SEARCH"
              />
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="close"
              >
                <i class="tim-icons icon-simple-remove"></i>
              </button>
            </div>
            <div
              class="modal-body"
              v-show="list.length"
              style="height: max-height: 400px; height:400px; overflow:scroll"
            >
              <ul>
                <li
                  v-for="(movie, index) in list"
                  :key="index"
                  class="searched-list"
                  :style="(movie.poster_path ?  'background-image: url(https://image.tmdb.org/t/p/w200/' +
                    movie.poster_path +
                    ')' : '')"
                >
                  <span class="movie-title">
                    {{ movie.title }}
                  </span>

                  <div class="movie-actions">
                    <button type="button" class="btn btn-sm btn-default" title="Adicionar a Lista" @click="addToWatchList($event, movie)">
                      <i class="tim-icons icon-heart-2"></i>
                    </button>
                    <button type="button" class="btn btn-sm btn-danger" title="Adicionar Lembrete" 
            @click="createReminder($event, movie)">
                      <i class="tim-icons icon-time-alarm"></i>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <movie-reminder :movie="toReminde" :profile="profile"></movie-reminder>
  </div>
</template>
<script>
import { movies } from "@/services/TMDBService";
import { $movie } from "@/services/Resources";
import Reminder from "@/components/modal/Reminder";
import Storage from "@/utils/Storage";

export default {
  props: ["show", "onClose", 'profile'],
  name: "ModalSearch",
   components: {
    "movie-reminder": Reminder,
  },
  data() {
    return {
      showModal: false,
      searchedText: "",
      list: [],
      profile: null,
      toReminde: null
  }
  },
  mounted() {
    let vueInstance = this;
    Storage.get("my-movie-profile").then((res) => {
      vueInstance.profile = res.id;
    });},
  methods: {
    close() {
      this.showModal = false;
      this.onClose();
    },
    async SearchMovie(event, text) {
      event.preventDefault();
      if (!text || text.length < 1) return;
      let result = await movies.search(text);
      this.list = result.results;
    },
    createReminder: function (event, movie) {
      event.preventDefault();
      this.toReminde = movie.id;
    },
    addToWatchList(event, movie) {
      event.preventDefault();
      let listed = {
        movie: movie.id,
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
    }
  },
  watch: {
    show: function (value) {
      this.searchedText = "";
      this.showModal = value;
    },
  },
};
</script>
<style>
.modal * {
  color: var(--dark) !important;
}
.modal-search .modal-header .close {
  color: #555555;
  top: 30px !important;
}
ul {
  list-style: none;
}
.searched-list {
  width: 100%;
  height: 80px;
  margin: 5px 0px;
  background-repeat: no-repeat;
  background-size: contain;
}
span.movie-title {
  margin-left: 75px;
  font-size: 18px !important;
}
.movie-actions {
  
  margin-left: 75px;
  display: block;
}
.searched-list i {
  font-weight: 500 !important;
  color: white !important;
}
</style>
