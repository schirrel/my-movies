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
            <span v-if="profile.main" class="main-profile">Perfil Principal</span>
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
import { $profile } from "@/services/Resources";
export default {
  name: "Profile",
  data() {
    return {
      profiles: [],
      editingAll: false,
    };
  },
  mounted() {
    setTimeout(this.loadProfile, 500);
  },
  methods: {
    async loadProfile() {
      let result = await $profile.search();
      this.profiles = result.data;
    },
    selectProfile: function (event, profile) {
      event.preventDefault();
      if (this.hasEditing || this.editingAll) {
        return;
      }
      if (profile.id) {
        Storage.set("my-movie-profile", profile);
        this.$router.push({ name: "secure.home" });
      }
    },
    addNewProfile: function () {
      if (this.profiles.length < 6 && !this.hasEditing) {
        this.profiles.push({
          name: `Perfil ${this.profiles.length}`,
          editing: true
        });
      }
      
      
    },
    createProfile: async function (event, profile) {
      event.preventDefault();
      
      delete profile.editing;
     await $profile.create(profile);
      this.loadProfile();
      
    },
    deleteProfile: async function (event, profile) {
      event.preventDefault();      
      await $profile.delete(profile.id);
      this.loadProfile();
    },
    removeProfiles: function (event) {
      event.preventDefault();
      this.editingAll = !this.editingAll;
    },
    defineMainProfile: async function (event, profile) {
      event.preventDefault();
      let current =  this.profiles.find(a => a.main);
      current.main = false;
      profile.main = true;
      
     await $profile.update(current);
     await $profile.update(profile);
      this.loadProfile();

      
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
li.nav-item.profile-item {
  position: relative;
}
li.nav-item.profile-item a {
  border: 2px solid transparent;
}

/* li.nav-item.profile-item.main-profile a {
  border: 2px solid white;
} */

span.main-profile {
 position: absolute;
    top: 5px;
    width: calc(100% - 10px);
    left: 0;
    right: 0;
    margin: 0;
    text-align: center;
    font-size: .8em;
}
</style>
