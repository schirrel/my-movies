<template>
  <div class="wrapper">
    <div class="page-header">
      <nav
        class="navbar navbar-expand-lg fixed-top navbar-transparent"
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
              
              <li class="nav-item">
                <router-link class="nav-link btn btn-primary" to="/login">
                  Acessar
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
                  <div class="card-footer">
                    <button class="btn btn-info btn-round btn-lg">
                      Salvar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {$user} from '../services/Resources';
export default {
  name: "Register",

  data() {
    return {
      user: {},
    };
  },
  methods: {
    onSubmit: function () {
      $user.post('/', this.user).then(console.log);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-title {
  color: white !important;
  padding-left: 10px;
  text-transform: capitalize !important;
}
</style>
