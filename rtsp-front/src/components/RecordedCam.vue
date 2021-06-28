<template>
  <v-row>
    <div class="d-flex flex-column justify-space-between align-center mt-5">
      <strong>Cams</strong>
    </div>
    {{cams}}
    <template v-for="n in Object.keys(cams)">
      <v-col :key="n" class="mt-2" cols="12">
        <strong>Cam {{ n }}</strong>
      </v-col>
      <v-col
        @click="getVideos(n, j)"
        v-for="j in Object.keys(cams[n].video)"
        :key="`${j}`"
        cols="6"
        md="2"
      >
        <v-sheet
          class="d-flex flex-column justify-space-between align-center"
          height="150"
          >{{ j }}</v-sheet
        >
      </v-col>
    </template>
  </v-row>
</template>

<script>
export default {
  name: "RecordedCam",
  props: ["cams"],
  methods: {
    getVideos(camName, Date) {
      console.log(camName);
      console.log(Date);
    },
  },
};
</script>

<style scoped></style>
