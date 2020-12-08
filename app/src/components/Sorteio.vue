<template>
  <div class="container">
    <form action @submit.prevent="submit">
      <article>
        <h4>Sorteio</h4>

        <div class="row">
          <div class="form-group col-12 col-md-6">
            <label for="fieldNome">Nome</label>
            <input
              class="form-control"
              type="text"
              v-model="sorteio.nome"
              placeholder="Nome"
              id="fieldNome"
              focusable
            />
          </div>
          <div class="form-group col-12 col-md-6">
            <label for="fieldTelefone">Telefone</label>
            <input
              class="form-control"
              type="number"
              v-model="sorteio.telefone"
              placeholder="Telefone"
              id="fieldTelefone"
              focusable
            />
          </div>
        </div>
      </article>

      <div class="form-group col-xs-12 form-footer">
        <button class="btn btn-lg btn-primary">Imprimir</button>
      </div>
    </form>
  </div>
</template>

<script>
import { $sorteio } from "@/services/Resources";
import { printSorteio } from "@/utils/Printer";

export default {
  name: "Sorteio",
  data() {
    return {
      sorteio: {},
      toasts: null,
    };
  },
  mounted() {
    document.addEventListener("keypress", function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });
    const focusable = Array.from(document.querySelectorAll("[focusable]"));
    focusable.forEach((item, index) => {
      item.addEventListener("keypress", (e) => {
        if (e.which == 13) {
          e.preventDefault();
          if (focusable.length > index + 1) {
            focusable[index + 1].focus();
          }
        }
      });
    });
  },
  methods: {
    submit: function () {
      if (this.toasts) {
        this.toasts.close();
      }
      $sorteio
        .save(this.sorteio)
        .then((res) => {
          this.toasts = this.$toast.success("Tudo certo!");
          this.imprimir(res);
          // eslint-disable-next-line no-undef
          setTimeout(() => {
            this.novo();
          });
        })
        .catch((err) => console.error(err));
    },
    imprimir: function (res) {
      printSorteio(res);
    },
    novo: function () {
      this.sorteio = {};
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  text-align: left;
}
ol.input-sacolao {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  align-content: center;
  justify-content: space-around;
}

ol.input-sacolao li input,
input[type="radio"] {
  position: absolute;
  opacity: 0;
}
ol.input-sacolao li label,
input[type="radio"] + label {
  border-radius: 4px;
  border: 2px solid #1834c8;
  padding: 15px;
  cursor: pointer;
}

input[type="radio"]:disabled + label {
  border: 2px solid #606c76;
  cursor: not-allowed;
  opacity: 0.7;
}

ol.input-sacolao li input:checked + label,
input[type="radio"]:checked + label {
  background: #1834c8;
  color: white;
}
/* .form-footer {
  position: fixed;
  width: 200px;
  height: 100vh;
  display: block;
  right: 10px;
  top: 50px;
}
.form-footer button {
  font-size: 20px;
  text-align: right;
  padding: 30px ;
  height: auto;
} */
.form-footer button {
  margin: 5px;
  font-size: 16px;
}
</style>
