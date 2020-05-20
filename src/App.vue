<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h3>Room</h3>
    </v-app-bar>

    <v-content>
      <room/>
    </v-content>
  </v-app>
</template>

<script>
import room from './components/room';

export default {
  name: 'App',

  components: {
    room
  },

  data: () => ({
    //
  }),
};
</script>
