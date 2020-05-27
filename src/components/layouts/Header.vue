<template>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h3>Project B</h3>
    <v-spacer></v-spacer>
    <v-btn class="ma-2" color="orange darken-2" dark @click="logout">
        <v-icon dark left>mdi-logout</v-icon>Logout
      </v-btn>
    </v-app-bar>
</template>

<script>

export default {
  name: 'Header',

  methods: {
    logout() {
        this.$router.push('login');
        localStorage.removeItem("token");
    }
  }
};
</script>
