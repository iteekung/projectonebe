<template>
  <v-app>
    <v-app-bar app color="primary" dark v-if="!isLoginPage">
      <h3>Project B</h3>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  mounted: function() {
    this.isLoginPage =
      this.$router.currentRoute.path == "/login" ? true : false;
  },

  data: () => ({
    isLoginPage: false
  })
};
</script>
