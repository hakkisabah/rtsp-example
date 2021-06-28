<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="$emit('dialog', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="save()"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div>
          Canvas Square Coordinates X :
          {{ canvasMeta.canvasSquareCoordinates.x }} Y :
          {{ canvasMeta.canvasSquareCoordinates.y }}
        </div>
        <div class="d-flex flex-column justify-space-between align-center mr-5">
          <v-img max-height="1024" max-width="768" :src="data"></v-img>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "SaveImage",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    canvasMeta: {
      type: Object,
    },
    data: null,
  },
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
  methods: {
    save() {
      const saveData = {
        id : Math.random().toString(36).substr(2, 9),
        imageData: this.data,
        coordinates: this.canvasMeta.canvasSquareCoordinates,
        date: this.canvasMeta.date,
        path: this.$store.getters.getPath
      }
      let currImages = this.$store.getters.getImages
      if (currImages[this.$store.getters.getPath]){
        currImages[this.$store.getters.getPath].push(saveData)
      }else{
        console.log(Array.isArray(currImages))
        currImages[this.$store.getters.getPath] = Array.isArray(currImages)? currImages.concat(saveData) : [currImages]
        console.log(currImages[this.$store.getters.getPath])
      }
      this.$store.commit("saveImage",currImages);
      alert("Saved!");
      this.$emit("dialog", false);
    },
  },
};
</script>
