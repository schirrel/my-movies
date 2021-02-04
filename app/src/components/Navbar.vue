
<template>
  <nav
    class="navbar navbar-expand-lg fixed-top navbar-transparent"
    color-on-scroll="100"
  >
    <div class="container">
      <div class="navbar-translate">
        <a
          class="navbar-brand"
          href="https://demos.creative-tim.com/blk-design-system/index.html"
          rel="tooltip"
          title=""
          data-placement="bottom"
          target="_blank"
          data-original-title="Designed and Coded by Creative Tim"
        >
          <span>My</span> Movies
        </a>
        <button
          class="navbar-toggler navbar-toggler toggled collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navigation"
          aria-controls="navigation-index"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </button>
      </div>
      <div
        class="navbar-collapse justify-content-end collapse"
        id="navigation"
        style=""
      >
        <div class="navbar-collapse-header">
          <div class="row">
            <div class="col-6 collapse-brand">
              <a> My Movies </a>
            </div>
            <div class="col-6 collapse-close text-right">
              <button
                type="button"
                class="navbar-toggler collapsed"
                data-toggle="collapse"
                data-target="#navigation"
                aria-controls="navigation-index"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i class="tim-icons icon-simple-remove"></i>
              </button>
            </div>
          </div>
        </div>
        <ul class="navbar-nav">
          <!-- <li class="dropdown nav-item">
            <a
              href="javascript:void(0)"
              class="dropdown-toggle nav-link"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <div class="notification d-none d-lg-block d-xl-block"></div>
              <i class="tim-icons icon-bell-55"></i>
              <p class="d-lg-none">Notifications</p>
            </a>
            <ul class="dropdown-menu dropdown-menu-right dropdown-navbar">
              <li class="nav-link">
                <a href="" class="nav-item dropdown-item"
                  >Nenhuma notificação</a
                >
              </li>
            </ul>
          </li> -->
          <notification :profile="profile"></notification>
          <li class="nav-item">
            <button
              type="button"
              class="nav-link btn btn-default"
              @click="openSearch"
            >
              <i class="tim-icons icon-zoom-split"></i>
              <span class="d-none d-lg-block d-xl-block"> Procurar </span>
            </button>
          </li>
          <li class="nav-item">
            <router-link to="/" class="nav-link btn btn-primary">
              {{ profile ? profile.name : "" }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/logout ">
              <i class="tim-icons icon-button-power"></i> Sair
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <modal-search
      :show="showSearchModal"
      :onClose="closeSearch"
      :profile="profile"
    ></modal-search>
  </nav>
</template>

<script>
import StorageService from "@/services/StorageService";
import Notification from "@/components/Notification";
import ModalSearch from "@/components/modal/ModalSearch";
export default {
  name: "Navbar",
  components: {
    notification: Notification,
    "modal-search": ModalSearch,
  },
  data() {
    return {
      profile: null,
      showSearchModal: false,
      profilePage: true,
    };
  },
  methods: {
    openSearch: function () {
      this.showSearchModal = true;
    },
    closeSearch: function () {
      this.showSearchModal = false;
    },
  },
  mounted() {
    StorageService.get("my-movie-profile").then((res) => {
      this.profile = res;
    });
  },
  watch: {
    $route() {
      StorageService.get("my-movie-profile").then((res) => {
        this.profile = res;
      });
      this.profilePage = this.$router.currentRoute.name == "secure.profile";
    },
  },
};
</script>

<style>
.navbar-expand-sm .navbar-nav .nav-link {
  padding-right: 1rem;
  padding-left: 1rem;
}
</style>