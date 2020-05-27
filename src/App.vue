<template>
  <v-app>
    <Header v-if="!isLoginPage" />

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/layouts/Header'

export default {
  name: "App",

  components: {
    Header
  },
  
  created () {
    this.checkLoginPage()
  },

  watch: {
    '$route': 'checkLoginPage'
  },

  data: () => ({
    isLoginPage: false
  }),

  methods: {
    checkLoginPage() {
      this.isLoginPage =
      this.$router.currentRoute.path == "/login" ? true : false;
    }
  }
};
</script>
