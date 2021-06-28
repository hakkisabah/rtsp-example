import recorder from "./controllers/recorder.js";
import fileController from "./controllers/fileController.js";
const __dirname = path.dirname(new URL(import.meta.url).pathname).substring(1);
import express from "express";
const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});
import http from "http";
const server = http.Server(app);
import { Server } from "socket.io";
// import rtsp from "rtsp-ffmpeg";
import rtsp from "./lib/rtsp-ffmpeg.js";
import path from 'path';
const io = new Server(server, {
  cors: { origin: "*" },
});
const PORT = 6147;
server.listen(PORT, function () {
  console.log(`Listening on localhost:${PORT}`);
});
const rtspAddr = [
  "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov",
  "rtsp://demo:demo@ipvmdemo.dyndns.org:5541/onvif-media/media.amp?profile=profile_1_h264&sessiontimeout=60&streamtype=unicast",
  "rtsp://91.227.157.117:554/live/ch00_0",
  "rtsp://93.47.192.183:554/live/ch00_0",
  "rtsp://212.80.86.68:554/live/ch00_0",
];
let cams = rtspAddr.map(function (uri, i) {
  let stream = new rtsp({
    input: uri,
    resolution: "1024x768",
    quality: 3,
  });
  stream.on("start", function () {
    console.log("stream " + i + " started");
    recorder.startRecording(rtspAddr[i], i);
  });
  stream.on("stop", function () {
    console.log("stream " + i + " stopped");
  });
  return stream;
});

cams.forEach(function (camStream, i) {
  var ns = io.of("/cam" + i);
  ns.on("connection", function (wsocket) {
    console.log("connected to /cam" + i);
    const pipeStream = function (data) {
      wsocket.emit("data", data);
    };
    camStream.on("data", pipeStream);

    wsocket.on("disconnect", function () {
      console.log("disconnected from /cam" + i);
      camStream.removeListener("data", pipeStream);
    });
  });
});
io.on("connection", function (socket) {
  socket.emit("start", rtspAddr);
});

// app.get("/", async function (req, res) {
//   res.sendFile(__dirname + "/index.html")
// });

app.get("/getallrecordedcams", async function (req, res) {
  res.status(200).json(await fileController.getCamRecords());
});
// ffmpeg -rtsp_transport tcp -y -loglevel verbose -timeout 3 -i rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov -acodec copy -vcodec copy  c0_s1_h264_640x480_30_vbr_500_99_40000000.mp4