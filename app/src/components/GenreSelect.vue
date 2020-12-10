

<template>
  <select class="form-control" @change="change">
    <option value="">Todos os Generos</option>
    <option
      v-for="(g, index) in genres"
      :key="index"
      :value="g.id"
      :selected="selectedOption(g)"
    >
      {{g.name }}
    </option>
  </select>
</template>

<script>
import { genres } from "@/services/TMDBService";
export default {
  name: "GenreSelect",
  props: ["value"],
  data() {
    return {
      selected: null,
      mutableValue: JSON.parse(JSON.stringify(this.value)),
      genres:[]
    };
  },
  mounted(){
          
    this.getGenre();
  },
  watch: {
    value() {
      this.mutableValue = JSON.parse(JSON.stringify(this.value));
    },
  },
  methods: {
    getGenre: async function () {
      let data = await genres();
      this.genres = data;
    },
    selectedOption(option) {
      if (this.mutableValue && this.mutableValue.id) {
        return option.id === this.mutableValue.id;
      }
      return false;
    },
    change(e) {
      const selectedCode = e.target.value;
      const option = this.options.find((option) => {
        return selectedCode === option.id;
      });
      this.mutableValue.country = option;
      this.$emit("input", this.mutableValue);
    },
  },
};
</script>

