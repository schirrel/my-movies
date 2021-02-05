
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
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Agendar {{ model.title }}
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
                  <h2>{{ model.title }}</h2>
                  <h4>{{ model.tagline }}</h4>
                  <div>
                    <label for="example-datepicker"
                      >Quando vamos te lembrar?</label
                    >
                    <b-form-datepicker
                      size="sm"
                      id="reminder-datepicker"
                      v-model="reminder"
                      class="form-control input-sm"
                    ></b-form-datepicker>
                  </div>
                </div>
              </div>

              <br />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-link" @click="close">
                Fechar
              </button>
              <button
                type="button"
                @click="saveReminder"
                class="btn btn-primary"
              >
                Confirmar Lembrete
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { movies } from "@/services/TMDBService";
import { $movie, $reminder } from "@/services/Resources";
import StorageService from "@/services/StorageService";
export default {
  name: "MovieDetails",
  props: ["movie"],
  data() {
    return {
      showModal: false,
      model: null,
      profile: null,
      reminder: new Date(),
    };
  },
  mounted() {
    let vueInstance = this;
    StorageService.get("my-movie-profile").then((res) => {
      vueInstance.profile = res.id;
    });
  },
  methods: {
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
    async saveReminder() {
      let toSave = {
        reminderAt: this.reminder,
        movie: this.model.id,
        title: this.model.title,
        profile: this.profile,
        createdAt: new Date(),
      };
      let result = await $reminder.create(toSave);
      if (result.data.id) {
        this.$toast.success("Lembrete Criado");
        this.showModal = false;
      }
    },
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

.b-form-datepicker label {
  
    padding: 10px;
    font-weight: 700;
    text-transform: capitalize;
}
.b-form-datepicker button,
.b-calendar .btn {
    background: transparent;
    color: black !important;
}
.b-form-datepicker button:hover,
.b-calendar .btn:hover,
.b-form-datepicker button:active,
.b-calendar .btn:active,
.b-form-datepicker button:focus,
.b-calendar .btn:focus {
    background: transparent !important;
    color: var(--primary) !important;
}.modal-content .modal-body {
    z-index: 999;}
</style>
