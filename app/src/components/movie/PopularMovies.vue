<template>
<movies-list :data="list"></movies-list>
</template>

<script>
import { movies } from "@/services/TMDBService";
import MoviesList from "@/components/movie/MoviesList";
export default {
  name: "PopularMovies",
    components: {
    "movies-list": MoviesList,
  },
  data() {
    return {
        list:[]
    };
  },
  mounted(){
      this.getList();
  },
  watch: {
    value() {
    }
  },
  methods: {
       getList: async function () {
      let data = await movies.popular();
      this.list = data.results;
    },
  }
};
</script>
