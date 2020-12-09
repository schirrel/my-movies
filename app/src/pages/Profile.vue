<template>
 <div>
   <h3>Select Profile</h3>
   <ul class="nav nav-pills nav-pills-primary nav-pills-icons">
     <template
        v-for="(profile, index) in profiles"
      >
        <li :key="index" class="nav-item">
           <a class="nav-link show" data-toggle="tab" href="#link7">
                  <i class="tim-icons icon-single-02"> </i>
                   <h4> {{profile.name}}</h4>
                    <div class="row profile-actions" v-if="profile-editing">
                      <div class="col-sm-6">
                     <i class="tim-icons icon-pencil"> </i></div>
                      <div class="col-sm-6">
                     <i class="tim-icons icon-trash-simple"> </i></div>
                    </div>

                  </a>
        </li>
     </template>
                <li class="nav-item" v-if="profiles.length < 5">
                  <a class="nav-link" data-toggle="tab" href="#link8">
                    <i class="tim-icons icon-simple-add"></i> Add new Profile
                  </a>
                </li>
              </ul>
 </div>
</template>

<script>

export default {
  name: "Profile",
  data() {
    return {
      profiles: [{name: 'Main Profile'}, {name:'Kids'}],
      toasts: null,
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4 {
  margin-bottom: 0 !important;
  padding-bottom:0 !important;
}
.profile-actions  i {
  font-size: 1em;
  line-height: 1em !important;
  padding: 0;
}
</style>
