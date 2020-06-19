<template>
  <v-data-table
    :headers="headers"
    :items="dataItems"
    sort-by="room"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Student</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
// import room from "./../mockup/room.json"
import Axios from 'axios'

export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'id',
          align: 'start',
          sortable: false,
          value: 'student_idname',
        },
        { text: 'ชื่อ', value: 'student_firstname' },
        { text: 'นามสกุล', value: 'student_lastname' },
        { text: 'check', value: 'check' },
      ],
      dataItems: [],
    }),

    created () {
        // console.log("param id: " + this.$router.params.id)
        this.initialize()
    },

    methods: {
      initialize () {
        this.editedItem = this.defaultItem;
        this.fetchDatas();
      },

      async fetchDatas() {
        await Axios.get(this.$mainUrl + "studentTestByTestid/" + this.$route.query.test_id)
          .then((res) => { this.dataItems = res.data; console.log(res.data) })
          .catch(err => alert(err));
      },

    },
  }
</script>