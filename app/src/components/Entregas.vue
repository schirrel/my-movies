<template>
  <div class="content">

    <ol v-show="!loading">
      <template
        v-show="data.collection && data.collection.length"
        v-for="(item, index) in data.collection"
      >
        <li :key="index">
          <h3>{{item.nome}} ({{item.sacolao ? "Sacolão "+item.sacolao :""}} {{ item.compras ? "Compras R$"+item.compras:""}}) - Bairro {{item.bairro }}</h3>
          <div>
            Endereço:
            <strong>{{item.endereco}} {{item.numero ? ", Nº"+item.numero:""}} {{item.bairro ? ", bairro "+item.bairro+".":""}}</strong>
            <br />
            <span v-if="item.referencia">Referência:{{item.referencia}}</span>
          </div>
          <!--  <template         
          v-for="(prop, index2) of item">
        {{index2}}:  <strong :key="index2"> {{prop}}  </strong> | 
          </template>-->
          <footer>
            <button class="btn btn-dark" @click="reimprimir($event, item)" type="button">Reimprimir</button>

            <button class="btn btn-primary" @click="entregue($event, item)" type="button">Entregue</button>
          </footer>
        </li>
      </template>
    </ol>
  </div>
</template>

<script>
import { $venda } from "@/services/Resources";
import print from "../utils/Printer";
export default {
  name: "Entregas",
  data() {
    return { data: {}, loading: false };
  },
  mounted() {
    $venda.loading((res) => {
      this.loading = res;
    });

    this.listar();
  },
  methods: {
    listar() {
      // this.data = { collection: [] };
      $venda.search({ entregue: false }).then((res) => {
        this.data = { collection: res };
      });
    },
    entregue($event, item) {
      $venda.entrega
        .save({ id: item.id, entregue: true })
        .then(this.listar)
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    },
    reimprimir($event, item) {
      print(item);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  text-align: left;
}
tfoot td {
  text-align: right;
}

td:first-child,
th:first-child {
  max-width: 50px !important;
}

td button {
  padding: 0px 5px !important;
  margin: 0;
}
.restart-button {
  float: left;
}

.winner {
  display: inline-block;
}
input[type="date"] {
  webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: 0.1rem solid #d1d1d1;
  border-radius: 0.4rem;
  box-shadow: none;
  box-sizing: inherit;
  height: 3.8rem;
  padding: 0.6rem 1rem;
  width: 100%;
}

.full-width {
  clear: both;
}

.quarter-width,
.three-quarter-width,
.half-width,
.three-quarter-width {
  padding: 0px 5px;
  float: left;
}

.three-quarter-width {
  width: 75%;
}
.quarter-width {
  width: 25%;
}
.half-width {
  width: 50%;
}
ol,
ul {
  list-style: none;
}
h3 {
  margin-bottom: 0;
  padding-bottom: 0;
}
li {
  border-bottom: 1px solid;
}
footer {
  width: 100%;
  display: block;
  position: relative;
  text-align: right;
}
footer > * {
  margin: 4px;
}
</style>
