<template>
  <article v-if="list.length">
    <h3>Minha lista</h3>
    <movies-list :data="list" :show-watched="true"></movies-list>
  </article>
</template>

<script>
import { $movie } from "@/services/Resources";
import MoviesList from "@/components/movie/MoviesList";
import StorageService from "@/services/StorageService";
export default {
  name: "MyListMovies",
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
  watch: {},
  methods: {
    getList: async function () {
      this.list = [];
      /*let data = await movies.popular();
      this.list = data.results;*/
      let result = await $movie.list(this.profile.id);
      this.list = result.data;
    },
  },
};
</script>
