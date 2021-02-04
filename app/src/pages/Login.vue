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
                <router-link class="nav-link btn btn-primary" to="/register">
                  Cadastre-se
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
                <h4 class="card-title">Login</h4>
              </div>
              <form class="form" action="" @submit.prevent="doLogin">
                <div class="card-body">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i class="tim-icons icon-email-85"></i>
                      </div>
                    </div>
                    <input
                      type="email"
                      placeholder="Email"
                      v-model="auth.email"
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
                      v-model="auth.password"
                      required
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div class="card-footer text-right">
                  <button class="btn btn-info btn-round btn-lg">
                    Acessar My Movies
                  </button>
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
import Auth from "../services/Auth";
export default {
  name: "Login",

  data() {
    return {
      auth: {},
    };
  },
  methods: {
    doLogin: function () {
      let vueInstance = this;
      Auth.login(
        this.auth,
        () => {
          vueInstance.$router.push({ name: "secure.profile" });
        },
        (err) => {
          if (err.response.status == 401) {
            vueInstance.$toast.error(err.response.data);
          } else {
            vueInstance.$toast.error("Não foi possivel acessar sua conta!");
          }
          console.log(err.message);
        }
      );
    },
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
</style>
