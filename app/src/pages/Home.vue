<template>
  <div class="container">
    <article>
      <my-list></my-list>
    </article>
    <article>
      <suggestions></suggestions>
    </article>
    <article>
      <popular></popular>
    </article>
  </div>
</template>

<script>
// import GenreSelect from "@/components/GenreSelect";
import PopularMovies from "@/components/movie/PopularMovies";
import MyListMovies from "@/components/movie/MyListMovies";
import SuggestMovies from "@/components/movie/SuggestMovies";
export default {
  name: "Home",
  components: {
    // "genres": GenreSelect,
    popular: PopularMovies,
    "my-list": MyListMovies,
    suggestions: SuggestMovies,
  },
  data() {
    return { genre: null };
  },
  mounted() {},
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
</style>
