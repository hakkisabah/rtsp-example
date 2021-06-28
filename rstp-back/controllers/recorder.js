import { Recorder } from "../plugins/node-rtsp-recorder-issued/index.js";
import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname).substring(1);
const recorder = {
  recordPath: __dirname + "/../records",
  startRecording(rtspUrl, camNumber) {
    let rec = new Recorder({
      url: rtspUrl,
      timeLimit: 60, // time in seconds for each segmented video file
      folder: this.recordPath,
      name: "cam" + camNumber,
    });
    // Starts Recording
    rec.startRecording();

    setTimeout(() => {
      console.log("Stopping Recording");
      rec.stopRecording();
      rec = null;
    }, 30000);
  },
  saveImage(base64Data, camNumber) {
    let rec = new Recorder({
      folder: this.recordPath,
      name: "cam" + camNumber,
    });
    rec.saveImage(base64Data);
  },
};

export default recorder;
