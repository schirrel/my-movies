<template>
  <div class="wrapper">
    <div class="page-header">
      <nav
        class="navbar navbar-expand-sm fixed-top navbar-transparent"
        color-on-scroll="100"
      >
        <div class="container">
          <div class="">
            <a
              class="navbar-brand"
              href="#"
              rel="tooltip"
              title=""
              data-placement="bottom"
              target="_blank"
              data-original-title="Designed and Coded by Creative Tim"
            >
              <span>My</span> Movies
            </a>
          </div>
          <div class="justify-content-end" id="navigation" style="">
            <div class="navbar-collapse-header">
              <div class="row">
                <div class="col-6 collapse-brand">
                  <a> My Movies </a>
                </div>
              </div>
            </div>
            <ul class="navbar-nav">
              <!-- <li class="nav-item">
                <router-link class="nav-link" to="/login ">
                  <small> Recuperar Senha </small>
                </router-link>
              </li> -->
              <li class="nav-item">
                <router-link class="nav-link btn btn-primary" to="/login">
                  Acessar
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div class="content">
      <div class="container">
        <div class="row">
          <div class="col-lg-5 col-md-6 offset-lg-0 offset-md-3">
            <div class="card card-register">
              <div class="card-header">
                <h4 class="card-title">Cadastro</h4>
              </div>
              <form class="form" action="" @submit.prevent="onSubmit">
                <div class="card-body">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i class="tim-icons icon-single-02"></i>
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Nome"
                      v-model="user.name"
                      required
                      class="form-control"
                    />
                  </div>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i class="tim-icons icon-email-85"></i>
                      </div>
                    </div>
                    <input
                      type="email"
                      placeholder="Email"
                      v-model="user.email"
                      required
                      class="form-control"
                    />
                  </div>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i class="tim-icons icon-lock-circle"></i>
                      </div>
                    </div>
                    <input
                      type="password"
                      class="form-control"
                      v-model="user.password"
                      required
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div class="card-footer register-footer">
                 <!--  <facebook-login
                    class="button"
                    appId="326022817735322"
                    @login="getUserData"
                    @logout="onLogout"
                    @get-initial-status="getUserData"
                  >
                  </facebook-login>
                  <button
                    class="btn btn-info btn-icon btn-round"
                    type="button"
                    @click="registerWithFacebook"
                    title="Utilizar Facebook"
                  >
                    <i class="fab fa-facebook-square fa-2x"></i>
                  </button> -->
                  <button class="btn btn-info btn-round">Salvar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import facebookLogin from "facebook-login-vuejs";

import { $user } from "@/services/Resources";
export default {
  name: "Register",
  components: {
    // facebookLogin,
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    onSubmit() {
      $user.post("/", this.user).then(() => {
        this.$toast.success("Usuário cadastrado com sucesso");
      });
    },
    registerWIthFacebook() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar > .container {
  margin-top: 5px;
  max-width: 100%;
  margin-bottom: 5px;
  margin-right: 0;
}
.card-title {
  color: white !important;
  padding-left: 10px;
  text-transform: capitalize !important;
  font-size: 3rem !important;
}
.card .card-header {
  padding: 15px 15px 0;
}
.register-footer {
  display: flex;
  justify-content: space-between;
}
</style>
