<template>
  <div class="wrapper">
    <div class="page-header">
      <div class="page-header-image"></div>
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
                  <div class="card-footer">
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
      Auth.login(this.auth, () => {
        his.$router.push({ name: 'profile' });
      });
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
