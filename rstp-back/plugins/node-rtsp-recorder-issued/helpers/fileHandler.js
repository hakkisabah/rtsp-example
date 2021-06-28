import fs from "fs";
import rimraf from "rimraf";
import getFolderSize from "get-folder-size";
import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname).substring(1);
const FileHandler = class {
  createDirIfNotExists(folderPath) {
    try {
      if (!fs.lstatSync(folderPath).isDirectory()) {
        fs.mkdirSync(folderPath);
      }
    } catch (e) {
      fs.mkdirSync(folderPath);
    }
  }

  removeDirectory(folderPath, callback) {
    rimraf(folderPath, callback);
  }

  writeToDiskImageFile(savePath, base64Data) {
    base64Data = base64Data.replace(/^data:image\/png;base64,/, "");
    fs.writeFile(savePath + ".png", base64Data, "base64", function (err) {
      console.log(err);
    });
  }

  async getDirectorySize(folderPath) {
    const size = await getFolderSize(folderPath);
    return size;
  }
  getMediaRecords(datePath) {
    return fs.readdirSync(datePath);
  }
  getDateRecords(Records, recordPath) {
    let image = {};
    let video = {};
    for (let i = 0; i < Records.length; i++) {
      const findedDateRecordPath = path.join(recordPath, `/${Records[i]}`);
      const isRecordsHere = fs.readdirSync(findedDateRecordPath);
      if (isRecordsHere.indexOf("image") > -1) {
        const isImage = this.getMediaRecords(
          path.join(findedDateRecordPath, `/image`)
        );
        if (isImage.length > 0) {
          image[Records[i]] = isImage;
        }
      }
      if (isRecordsHere.indexOf("video") > -1) {
        const isVideo = this.getMediaRecords(
          path.join(findedDateRecordPath, `/video`)
        );
        if (isVideo.length > 0) {
          video[Records[i]] = this.getMediaRecords(
            path.join(findedDateRecordPath, `/video`)
          );
        }
      }
    }
    return { image, video };
  }
  async getCamRecords() {
    let Files = {};
    const recordsFolder = fs.readdirSync(
      path.join(__dirname, "/../../../records")
    );
    if (recordsFolder.length > 0) {
      for (let i = 0; i < recordsFolder.length; i++) {
        const mainDir = path.join(
          __dirname,
          `/../../../records/${recordsFolder[i]}`
        );
        const isRecordDated = fs.readdirSync(mainDir);
        const fsize = await this.getDirectorySize(mainDir);
        if (fsize.size > 0) {
          Files[recordsFolder[i]] = await this.getDateRecords(
            isRecordDated,
            path.join(__dirname, `/../../../records/${recordsFolder[i]}`)
          );
        }
      }
    }
    // Object.keys(Files).forEach((f, i) => console.log(i + " ", Files[f]));
    return Files;
  }
};

export default FileHandler;
