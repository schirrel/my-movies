<template>
<movies-list :data="list"></movies-list>
</template>

<script>
import { movies } from "@/services/TMDBService";
import { $movie } from "@/services/Resources";
import MoviesList from "@/components/movie/MoviesList";
export default {
  name: "MyListMovies",
    components: {
    "movies-list": MoviesList,
  },
  data() {
    return {
        list:[],
      profile: null
    };
  },
  mounted(){
      this.getList();
  },
  watch: {
  },
  methods: {
       getList: async function () {
       this.list = [];
      /*let data = await movies.popular();
      this.list = data.results;*/
       let result = await $movie.list({
        profile: this.profile,
      });      
      this.list = result.data;
      
      
    },
  }
};
</script>
