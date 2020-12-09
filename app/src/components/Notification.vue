

<template>
        <li class="dropdown nav-item">
                <a href="javascript:void(0)" class="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false">
                  <div class="notification d-none d-lg-block d-xl-block"></div>
                  <i class="tim-icons icon-sound-wave"></i>
                  <p class="d-lg-none">
                    Notifications
                  </p>
                </a>
                <ul class="dropdown-menu dropdown-menu-right dropdown-navbar">
                <template v-for="(message, index) in data">
                     <li class="nav-link"><a href="#" class="nav-item dropdown-item">{{message}}</a></li>
                  </template>
                  
                     <li v-if="!data.length" class="nav-link">No message</li>
                </ul>
              </li>
  </nav>
</template>

<script>
export default {
  name: "Notification",
  mounted() {
  },
  data() {
    return {};
  },
};
</script>
