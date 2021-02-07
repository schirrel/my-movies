<template>
  <div v-if="list">
    <h3>Indicados para voce</h3>
    <movies-list :data="list"></movies-list>
  </div>
</template>

<script>
import { $movie } from "@/services/Resources";
import MoviesList from "@/components/movie/MoviesList";
import StorageService from "@/services/StorageService";
export default {
  name: "PopularMovies",
  components: {
    "movies-list": MoviesList,
  },
  data() {
    return {
      list: [],
      profile: null,
    };
  },
  mounted() {
    StorageService.get("my-movie-profile").then((res) => {
      this.profile = res;
      this.getList();
    });
  },
  watch: {
    value() {},
  },
  methods: {
    getList: async function () {
      let response = await $movie.suggestion(this.profile.id);
      console.log(response.data.results);
      this.list = response.data.results;
    },
  },
};
</script>
