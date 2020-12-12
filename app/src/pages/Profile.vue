<template>
  <div class="container profiles">
    <h3>Selecionar Perfil</h3>
    <ul class="nav nav-pills nav-pills-primary nav-pills-icons">
      <template v-for="(profile, index) in profiles">
        <li
          :key="index"
          class="nav-item profile-item"
          :class="profile.main ? 'main-profile' : ''"
        >
          <a
            class="nav-link show"
            :data-toggle="editingAll || profile.editing ? '' : 'tab'"
            href="#"
            @click="selectProfile($event, profile)"
          >
            <i v-if="!profile.editing" class="tim-icons icon-single-02"> </i>
            <h5 v-if="!profile.editing">{{ profile.name }}</h5>
            <div v-if="profile.editing || editingAll">
              <input
                class="form-control mb-2"
                v-if="profile.editing"
                type="text"
                v-model="profile.name"
              />

              <div class="row profile-actions">
                <div class="col-sm-6">
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="deleteProfile($event, profile)"
                  >
                    <i class="tim-icons icon-trash-simple"> </i>
                  </button>
                </div>
                <div v-if="editingAll" class="col-sm-6">
                  <button
                    type="button"
                    class="btn btn-success btn-sm"
                    title="Definir Principal"
                    @click="defineMainProfile($event, profile)"
                  >
                    <i class="tim-icons icon-shape-star"> </i>
                  </button>
                </div>
                <div class="col-sm-6" v-if="profile.editing">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="createProfile($event, profile)"
                  >
                    <i class="tim-icons icon-check-2"> </i>
                  </button>
                </div>
              </div>
            </div>
          </a>
        </li>
      </template>
      <li class="nav-item" v-if="profiles.length < 5 && !editingAll">
        <a class="nav-link" href="#" @click="addNewProfile">
          <i class="tim-icons icon-simple-add"></i> Adicionar Perfil
        </a>
      </li>
    </ul>

    <div class="col-12 text-center mt-3">
      <a href="#" @click="removeProfiles">
        <i class="tim-icons icon-trash-simple"></i> Editar perfis</a
      >
    </div>
  </div>
</template>

<script>
import Storage from "@/utils/Storage";
export default {
  name: "Profile",
  data() {
    return {
      profiles: [
        { id: 1, name: "Main Profile" },
        { id: 2, name: "Kids" },
      ],
      editingAll: false,
    };
  },
  methods: {
    selectProfile: function (event, profile) {
      event.preventDefault();
      if (this.hasEditing || this.editingAll) {
        return;
      }
      if (profile.id) {
        Storage.set("my-movie-profile", profile);
        this.$router.push({ name: 'secure.home' });
      }
    },
    addNewProfile: function () {
      if (this.profiles.length < 6 && !this.hasEditing) {
        this.profiles.push({
          name: `Perfil ${this.profiles.length}`,
          editing: true,
          id: this.profiles.length + 1,
        });
      }
    },
    createProfile: function (event, profile) {
      event.preventDefault();
      profile.editing = false;
    },
    deleteProfile: function (event, profile) {
      event.preventDefault();
      this.profiles = this.profiles.filter((p) => p.id != profile.id);
    },
    removeProfiles: function (event) {
      event.preventDefault();
      this.editingAll = !this.editingAll;
    },
    defineMainProfile: function (event, profile) {
      event.preventDefault();
      this.profiles.forEach((a) => {
        a.main = a.id == profile.id;
      });
    },
  },
  computed: {
    hasEditing() {
      return this.profiles.find((p) => p.editing);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h5 {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
  font-size: 1.1em;
  font-weight: 700;
}
.profile-actions i {
  font-size: 1.2em !important;
  line-height: 1em !important;
  padding: 0;
}
.profiles ul {
  justify-content: center;
}
li.nav-item.profile-item a {
  border: 2px solid transparent;
}

li.nav-item.profile-item.main-profile a {
  border: 2px solid white;
}
</style>
