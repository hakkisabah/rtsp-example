<template>
  <v-container>
    <RecordedCam :cams="getVideos"></RecordedCam>
    <CapturedImage :images="getImages"></CapturedImage>
  </v-container>
</template>
<script>
import RecordedCam from "./RecordedCam";
import CapturedImage from "./CapturedImage";
import { mapGetters } from "vuex";
export default {
  name: "Records",
  components: {
    RecordedCam,
    CapturedImage,
  },
  computed: {
    ...mapGetters(["getVideos","getImages"]),
  },
  created() {
    this.$store.dispatch("initApp");
  },
};
</script>
