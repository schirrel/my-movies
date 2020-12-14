

<template>
  <li class="dropdown nav-item">
    <a
      href="javascript:void(0)"
      class="dropdown-toggle nav-link"
      data-toggle="dropdown"
      aria-expanded="false"
    >
      <div class="notification d-none d-lg-block d-xl-block"></div>
      <i class="tim-icons icon-sound-wave"></i>
      <p class="d-lg-none">Notifications</p>
    </a>
    <ul class="dropdown-menu dropdown-menu-right dropdown-navbar">
      <template v-for="(reminder, index) in list">
        <li :key="index" class="nav-link">
          <a href="#" class="nav-item dropdown-item">{{ reminder }}</a>
        </li>
      </template>

      <li v-if="!data.length" class="nav-link">No message</li>
    </ul>
  </li>
</template>

<script>

import { $reminder } from "@/services/Resources";
import Storage from "@/utils/Storage";
export default {
  name: "Notification",
  mounted() {
    let vueInstance = this;
    Storage.get("my-movie-profile").then((res) => {
      vueInstance.profile = res.id;
    });
  },
  data() {
    return {
      profile: null};
  },
  
  methods: {
  getList: async function () {
       this.list = [];
       let result = await $reminder.search({
        profile: this.profile,
      });      
      this.list = result.data;      
      
    }
  }
};
</script>
