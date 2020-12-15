<template>
  <div v-if="showModal">
    <transition name="modal-fade">
      <div
        class="modal fade show"
        :id="'modal-movie-' + movie"
        tabindex="-1"
        role="dialog"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-actions">
            <div class="col-4">
              <button
                type="button"
                class="btn btn-link hover-red"
                :class="model.list ? 'btn-default' : ''"
                title="Adicionar a Lista"
                @click="addToWatchList"
              >
                <i
                  class="tim-icons icon-heart-2"
                  :class="model.list ? 'text-success' : ''"
                ></i>
                <span class="sr-only">{{ model.list ? "Listado" : "" }}</span>
              </button>
            </div>
            <div class="col-4">
              <button
                type="button"
                class="btn btn-link hover-yellow"
                title="Criar Lembrete"
            @click="createReminder($event, model)"
              >
                <i class="tim-icons icon-time-alarm"></i>
              </button>
            </div>
            <div class="col-4">
              <button
                type="button"
                class="close"
                @click="close"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div class="modal-content">
            <div
              class="modal-background"
              :style="
                'background-image: url(https://image.tmdb.org/t/p/w500/' +
                model.backdrop_path +
                ')'
              "
            ></div>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Detalhes de {{ model.title }}
              </h5>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4 col-6">
                  <img
                    :src="
                      'https://image.tmdb.org/t/p/w300/' + model.poster_path
                    "
                  />
                </div>
                <div class="col-sm-8 col-6">
                  <ul>
                    <li><small>Avaliação: </small> {{ model.vote_average }}</li>

                    <li>
                      <small>Data de Lancamento: </small>
                      {{ model.release_date }}
                    </li>

                    <li><small>Duração: </small> {{ model.release_date }}</li>
                  </ul>

                  <h2>{{ model.title }}</h2>
                  <h4>{{ model.tagline }}</h4>
                  <p>
                    {{ model.overview }}
                  </p>
                  <small class="text-mutted">{{ model.genre }}</small>
                </div>
              </div>

              <br />
            </div>

            <div class="modal-footer" v-if="model.homepage">
              <a :href="model.homepage">Acessar Página</a>
            </div>
            <!-- <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="close">
                Fechar
              </button>
              <button type="button" class="btn btn-primary">
                Salvar a Lista
              </button>
            </div> -->
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
  name: "MovieDetails",
  props: ["movie"],
  components: {
    "movie-reminder": Reminder,
  },
  data() {
    return {
      showModal: false,
      model: null,
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
  methods: {
    createReminder: function (event, movie) {
      event.preventDefault();
      this.toReminde = movie.id;
    },
    close() {
      this.showModal = false;
    },
    async loadMovie() {
      let data = await movies.get(this.movie);
      this.model = data;
      this.model.genre = data.genres.map((g) => g.name).join(", ");
      let result = await $movie.search({
        movie: this.model.id,
        profile: this.profile,
      });
      if (result && result.data && result.data.length) {
        this.model.list = result.data[0];
      }
    },
    addToWatchList() {
      let listed = {
        movie: this.model.id,
        profile: this.profile,
      };

      $movie
        .create(listed)
        .then((res) => {
          this.model.list = res;
          this.$toast.success("Filme adicionado a sua lista");
        })
        .catch((err) => {
          this.$toast.error(err.response.data || err.message);
        });
    }
  },
  watch: {
    movie: function () {
      this.loadMovie();
    },
    model: function () {
      this.showModal = true;
    },
  },
};
</script>
<style>
h2 {
  color: var(--default) !important;
  margin-bottom: 5px !important;
}
h4 {
  font-weight: 600;
  color: var(--dark) !important;
}
.modal * {
  color: var(--dark);
}

.modal-content > *:not(.modal-background) {
  z-index: 99;
}
.modal.show .modal-dialog {
  transform: translate(0) !important;
}
.modal.show {
  display: block;
  opacity: 1;
  background: rgba(0, 0, 0, 0.8);
  overflow: scroll;
}
.modal-background {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  background-size: cover;
  z-index: 1;
}
.modal-actions {
  width: 150px;
  display: flex;
  position: absolute;
  background: var(--primary);
  z-index: 999;
  justify-content: center;
  align-items: center;
  right: 10px;
  /* right: 0;
  left: 0;
  margin: auto; */
  margin-top: -25px;
  border-radius: 8px;
  pointer-events: all;
}
.modal-actions * {
  font-weight: 700 !important;
}
.modal ul {
  padding-left: 0;
}

.modal .li {
  padding: 0;
  margin: 0;
}
</style>
