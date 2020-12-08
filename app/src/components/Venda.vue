<template>
  <div class="container">
    <form action @submit.prevent="submit">
      <article>
        <h4>Nova Venda</h4>
        <div class="row">
          <div class="form-group col-12 col-md-6">
            <label for="fieldSacolao">Sacolão</label>
            <ol class="input-sacolao">
              <li>
                <input type="radio" id="sacolao60" value="60" v-model="venda.sacolao" />
                <label for="sacolao60">60</label>
              </li>

              <li>
                <input type="radio" id="sacolao100" value="100" v-model="venda.sacolao" />
                <label for="sacolao100">100</label>
              </li>

              <li>
                <input type="radio" id="sacolao150" value="150" v-model="venda.sacolao" />
                <label for="sacolao150">150</label>
              </li>

              <li>
                <input type="radio" id="sacolao200" value="200" v-model="venda.sacolao" />
                <label for="sacolao200">200</label>
              </li>

              <li>
                <input type="radio" id="sacolao300" value="300" v-model="venda.sacolao" />
                <label for="sacolao300">300</label>
              </li>
              <input type="hidden" name="sacolao" required :value="venda.sacolao" />
            </ol>
          </div>

          <div class="form-group col-12 col-md-6">
            <label for="fieldCompras">Compras</label>
            <input
              class="form-control"
              v-model.lazy="venda.compras"
              v-money="money"
              id="fieldCompras"
              focusable
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-12 col-md-6">
            <label for="fieldNome">Nome</label>
            <input
              class="form-control"
              type="text"
              v-model="venda.nome"
              placeholder="Nome"
              id="fieldNome"
              required
              focusable
            />
          </div>
          <div class="form-group col-12 col-md-6">
            <label for="fieldTelefone">Telefone</label>
            <input
              class="form-control"
              type="number"
              v-model="venda.telefone"
              placeholder="Telefone"
              id="fieldTelefone"
              focusable
            />
          </div>
        </div>

        <div class="row">
          <div class="form-group col-12">
            <label for="fieldEndereco">Endereço</label>
            <input
              type="text"
              class="form-control"
              v-model="venda.endereco"
              placeholder="Endereço"
              id="fieldEndereco"
              focusable
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-12 col-md-6">
            <label for="fieldNumero">Número</label>
            <input
              type="text"
              class="form-control"
              v-model="venda.numero"
              placeholder="Número"
              id="fieldNumero"
              focusable
            />
          </div>
          <div class="form-group col-12 col-md-6">
            <label for="fieldBairro">Bairro</label>
            <input
              type="text"
              class="form-control"
              v-model="venda.bairro"
              placeholder="Bairro"
              id="fieldBairro"
              required
              focusable
            />
          </div>
        </div>
        <div class="row">
          <div class="form-group col-12">
            <label for="fieldReferencia">Referência</label>
            <input
              type="text"
              class="form-control"
              v-model="venda.referencia"
              placeholder="Referência"
              id="fieldReferencia"
              focusable
            />
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <label for>Pagamento</label>
          </div>

          <div class="form-group col-12 col-sm-4">
            <input
              type="radio"
              id="fieldReceber"
              name="pagamento"
              v-model.lazy="venda.pagamento"
              value="receber"
            />
            <label for="fieldReceber">Dinheiro</label>
            <div v-if="venda.receber" class="form-group">
              <label for="fieldTroco">Troco Para</label>
              <input
                v-money="money"
                class="form-control"
                v-model.lazy="venda.trocoPara"
                placeholder="Troco Para"
                id="fieldTroco"
                required
                v-on:change="setTroco"
              />
            </div>
          </div>

          <div class="form-group col-12 col-sm-4">
            <input
              type="radio"
              id="fieldPagamentoCartao"
              name="pagamento"
              v-model.lazy="venda.pagamento"
              value="cartao"
            />
            <label for="fieldPagamentoCartao">Cartão</label>
          </div>

          <div class="form-group col-12 col-sm-4">
            <input
              type="radio"
              id="fieldPago"
              name="pagamento"
              v-model.lazy="venda.pagamento"
              value="pago"
            />
            <label for="fieldPago">Pago</label>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-12">
            <label for="fieldObs">OBS</label>
            <textarea
              class="form-control"
              v-model="venda.obs"
              placeholder="OBS"
              id="fieldObs"
              focusable
            />
          </div>
        </div>

        <div class="row">
          <div class="form-group col-12 col-md-6">
            <label for="fieldData">Data</label>
            <input
              type="date"
              class="form-control"
              v-model="venda.data"
              placeholder="Data"
              id="fieldData"
              focusable
            />
          </div>
          <div class="form-group col-12 col-md-6">
            <label for="fieldHora">Hora</label>
            <input
              type="time"
              class="form-control"
              v-model="venda.hora"
              placeholder="Hora"
              id="fieldHora"
              focusable
            />
          </div>
        </div>
      </article>

      <div class="form-group col-xs-12 form-footer">
        <button class="btn btn-lg btn-primary">Imprimir</button>
        <button type="button" class="btn btn-dark" v-on:click="salvar()">Salvar Somente</button>
        <button type="button" class="btn btn-dark" v-on:click="novo()">Novo</button>
      </div>
    </form>
  </div>
</template>

<script>
import { $venda } from "@/services/Resources";
import { VMoney } from "v-money";
import { defined, clearMoney } from "../utils/Util";
import print from "@/utils/Printer";

export default {
  name: "Venda",
  directives: { money: VMoney },
  data() {
    return {
      venda: {},
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
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
      if (defined(this.venda.sacolao) || defined(this.venda.pagamento)) {
        $venda
          .save(this.venda)
          .then(() => {
            this.toasts = this.$toast.success("Tudo certo!");
            this.imprimir();
            // eslint-disable-next-line no-undef
            setTimeout(() => {
              this.novo();
            });
          })
          .catch((err) => console.error(err));
      } else {
        this.toasts = this.$toast.error(
          "Esqueceu do valor do sacolão ou das compras?"
        );
      }
    },
    imprimir: function () {
      print(this.venda);
    },
    novo: function () {
      this.venda = {};
    },
    updatePagamento(selected) {
      this.venda.pago = false;
      this.venda.receber = false;
      this.venda.cartao = false;
      this.venda[selected] = true;
    },
    setTroco() {
      clearMoney(this.venda.trocoPara);
    },
  },
  computed: {
    pagamento() {
      return this.venda.pagamento;
    },
  },
  watch: {
    pagamento() {
      this.updatePagamento(this.venda.pagamento);
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
