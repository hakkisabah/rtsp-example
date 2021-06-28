<template>
  <v-container>
    <v-row>
      <v-select @change="showCam" :items="cams" label="Cams">
        <template v-slot:item="{ item, attrs, on }">
          <v-list-item v-bind="attrs" v-on="on">
            <v-list-item-title
              :id="attrs['aria-labelledby']"
              v-text="`cam${cams.indexOf(item)}`"
            ></v-list-item-title>
          </v-list-item>
        </template>
      </v-select>
    </v-row>
    <v-row>
      <template>
        <v-btn @click="captureImage()" block> Take A Screen Shot </v-btn>
      </template>
      <div class="d-flex flex-column justify-space-between align-center mr-5">
        <canvas class="col-md-8" width="1024" height="960" id="c"></canvas>
      </div>
    </v-row>
    <SaveImage
      @dialog="ss = $event"
      :dialog="ss"
      :data="base64CapturedImageData"
      :canvasMeta="canvasMeta"
    ></SaveImage>
  </v-container>
</template>

<script>
import io from "socket.io-client";
import SaveImage from "./SaveImage";
export default {
  name: "Sock",
  components: {
    SaveImage,
  },
  data() {
    return {
      socket: io(this.$store.getters.getAddr),
      stream: null,
      vueCanvas: null,
      rectWidth: 200,
      cams: [],
      ss: false,
      base64CapturedImageData: "",
      canvasMeta: {
        canvasSquareCoordinates: {
          x: 500,
          y: 390,
        },
        date: null,
      },
    };
  },
  watch: {
    stream: function (newVal) {
      const { img, url } = this.returnParsedData(newVal);
      const self = this;
      img.onload = function () {
        URL.revokeObjectURL(url);
        self.vueCanvas.drawImage(img, 100, 100);
      };
    },
  },
  methods: {
    captureImage() {
      var ctx = this.vueCanvas.canvas.getContext("2d");
      ctx.beginPath();
      ctx.rect(
        this.canvasMeta.canvasSquareCoordinates.x,
        this.canvasMeta.canvasSquareCoordinates.y,
        150,
        150
      );
      ctx.fillStyle = "white";
      ctx.fillRect(820, 110, 200, 20);
      ctx.fillStyle = "red";
      ctx.font = "5pt";
      this.canvasMeta.date = new Date().toLocaleDateString();
      ctx.strokeText("Screen Shot Date => " + this.canvasMeta.date, 820, 120);
      ctx.stroke();
      const base64Data = this.vueCanvas.canvas.toDataURL();
      this.base64CapturedImageData = base64Data;
      this.ss = true;
    },
    returnParsedData(data) {
      var bytes = new Uint8Array(data);

      var blob = new Blob([bytes], { type: "application/octet-binary" });

      var url = URL.createObjectURL(blob);

      var img = new Image();

      img.src = url;

      return { img, url };
    },
    streamTrigger(currentSocket) {
      const self = this;
      currentSocket.on("data", function (data) {
        self.stream = data;
      });
    },
    showCam(val) {
      this.socket.disconnect();
      this.socket = null;
      this.socket = io(
        `${this.$store.getters.getAddr}cam${this.cams.indexOf(val)}`
      );
      this.$store.commit("setCamPath",`cam${this.cams.indexOf(val)}`)
      this.streamTrigger(this.socket);
    },
    clearCRect() {
      this.vueCanvas.clearRect(0, 0, 400, 200);
    },
    drawRect() {
      // clear canvas
      this.clearCRect();
      // draw rect
      this.vueCanvas.beginPath();
      this.vueCanvas.rect(20, 20, this.rectWidth, 100);
      this.vueCanvas.stroke();
    },
    addWidth() {
      this.rectWidth += 10;
      this.drawRect();
    },
    subWidth() {
      this.rectWidth -= 10;
      this.drawRect();
    },
  },
  mounted() {
    this.socket.on("start", (cams) => {
      this.$store.commit("setCams", cams);
      this.cams = cams;
    });
    var c = document.getElementById("c");
    var ctx = c.getContext("2d");
    this.vueCanvas = ctx;
  },
};
</script>
