

<template>
  <li class="dropdown nav-item">
    <a
      href="javascript:void(0)"
      class="dropdown-toggle nav-link"
      data-toggle="dropdown"
      aria-expanded="false"
    >
      <div
        class="notification d-none d-lg-block d-xl-block"
        v-if="list.length"
      ></div>
      <i class="tim-icons icon-bell-55"></i>
      <p class="d-lg-none">Notificações</p>
    </a>
    <ul class="dropdown-menu dropdown-menu-right dropdown-navbar">
      <template v-for="(reminder, index) in list">
        <li :key="index" class="nav-link">
          <a href="#" class="nav-item dropdown-item">{{
            reminder.movie_title
          }}</a>
        </li>
      </template>

      <li v-if="!list.length" class="nav-link">Você não tem notificações</li>
    </ul>
  </li>
</template>

<script>
import { $reminder } from "@/services/Resources";
export default {
  props: ["profile"],
  name: "Notification",
  data() {
    return { list: [] };
  },
  mounted() {
    this.intervalID = setInterval(this.getList, 50000);
  },
  beforeDestroy: function () {
    clearInterval(this.intervalID);
  },
  methods: {
    getList: async function () {
      let result = await $reminder.search(
        {
          profile: this.profile,
        },
        { loading: false }
      );
      this.list = result.data;
    },
  },
};
</script>
