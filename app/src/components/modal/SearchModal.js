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
                class="close"
                @click="close"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        <div class="modal-content">
            <div class="modal-header">
              <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="SEARCH">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <i class="tim-icons icon-simple-remove"></i>
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

export default {
  name: "SearchModal",
  data() {
    return {
      showModal: false
    };
  },
  mounted() {
  },
  methods: {
    close() {
      this.showModal = false;
    }
  },
  watch: {
    model: function () {
      this.showModal = true;
    }
  }
};
</script>
<style>
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
