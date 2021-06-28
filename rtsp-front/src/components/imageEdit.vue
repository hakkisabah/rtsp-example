<template>
  <v-row justify="center">
    <v-dialog
        v-model="editDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="$emit('editDialog', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="$emit('editDialog', false)"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <template>
          <v-btn @click="edit()" block> edit </v-btn>
        </template>
        <div>
          Canvas Square Coordinates X :
          {{ editInfo.coordinates.x }} Y :
          {{ editInfo.coordinates.y }}
        </div>
        <div class="d-flex flex-column justify-space-between align-center mr-5">
          <v-img v-if='editInfo.imageData' max-height="1024" max-width="768" :src="editInfo.imageData"></v-img>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "imageEdit",
  props: {
    editDialog: {
      type: Boolean,
      default: false,
    },
    editInfo: {
      type: Object,
    },
  },
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
  methods:{
    edit(){
      alert("its edit button!")
    }
  },
  mounted() {
    console.log(this.editInfo)
  }
};
</script>
