<template>
  <v-data-table
    :headers="headers"
    :items="dataItems"
    sort-by="room"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Test</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
           <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                        :items="subjects"
                        v-model="editedItem.sub_id"
                        item-value="sub_id"
                        item-text="sub_thai"
                        label="วิชา"
                      ></v-select>
                    <!-- <v-text-field v-model="editedItem.sub_thai" label="วิชา"></v-text-field> -->
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                        :items="rooms"
                        v-model="editedItem.room_id"
                        item-value="id"
                        item-text="room_id"
                        label="ห้อง"
                      ></v-select>
                    <!-- <v-text-field v-model="editedItem.room_name" label="ห้อง"></v-text-field> -->
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.date_test" label="วันที่"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.time_test" label="เวลา"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card> 
        </v-dialog>
        
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
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
          text: 'รหัสวิชา',
          align: 'start',
          sortable: false,
          value: 'sub_id',
        },
        { text: 'วิชา', value: 'sub_thai' },
        { text: 'ห้อง', value: 'room_name' },
        { text: 'อาคาร', value: 'building' },
        { text: 'วันที่', value: 'date_test' },
        { text: 'เวลา', value: 'time_test' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      dataItems: [],
      subjects: [],
      rooms: [],
      editedIndex: -1,
      editedItem: {
      },
      defaultItem: {
        sub_id: 0,
        sub_thai: '',
        room_id: 0,
        room_name: '',
        building: '',
        date_test: '',
        time_test: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.editedItem = this.defaultItem;
        this.fetchDatas();
      },

      getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      },

      async fetchDatas() {
        await Axios.get(this.$mainUrl + "test")
          .then((res) => { this.dataItems = res.data })
          .catch(err => alert(err));

        await Axios.get(this.$mainUrl + "rooms")
          .then((res) => { this.rooms = res.data })
          .catch(err => alert(err));

        await Axios.get(this.$mainUrl + "subject")
          .then((res) => { this.subjects = res.data })
          .catch(err => alert(err));
      },

      editItem (item) {
        this.editedIndex = this.dataItems.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      async deleteItem (item) {
        const index = this.dataItems.indexOf(item)
        var sure = confirm('Are you sure you want to delete this item?')
        if (sure) {
          await Axios.delete(this.$mainUrl + "test/" + this.dataItems[index].id)
            .then(() => {
              this.dataItems.splice(index, 1)
            })
            .catch(err => alert(err));
        }
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        if (this.editedIndex > -1) {
          // change subject sub_thai 
          this.selectedSubject = this.subjects.find(item => item.sub_id === this.editedItem.sub_id)
          this.editedItem.sub_thai = this.selectedSubject.sub_thai;
          // change room room_name 
          this.selectedRoom = this.rooms.find(item => item.id === this.editedItem.room_id)
          this.editedItem.room_name = this.selectedRoom.room_id;
          await Axios.put(this.$mainUrl + "test/" + this.dataItems[this.editedIndex].id, this.editedItem)
            .then(() => {
              Object.assign(this.dataItems[this.editedIndex], this.editedItem)
            })
            .catch(err => alert(err));
        } else {
          await Axios.post(this.$mainUrl + "test", this.editedItem)
            .then(() => {
              this.dataItems.push(this.editedItem)
            })
            .catch(err => alert(err));
        }
        this.close()
      },
    },
  }
</script>