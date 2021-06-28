import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cams: [],
    images: [],
    records: [],
    currentCapturedImageBinary: null,
    currentCamAddr: "http://localhost:6147/",
    isConnected: false,
    socketMessage: "",
    path: "",
  },
  actions: {
    initApp({ commit, state }) {
      axios
        .get(state.currentCamAddr + "getallrecordedcams")
        .then((response) => {
          commit("setCamRecords", response.data);
        });
    },
  },
  mutations: {
    setCamRecords(state, camRecords) {
      state.records = camRecords;
    },
    setCams(state, cams) {
      state.cams = cams;
    },
    setCamPath(state, path) {
      state.path = path;
    },
    setCapturedCurrentImage(state, currentImage) {
      state.currentCapturedImageBinary = currentImage;
    },
    saveImage(state, imageInfo) {
      state.images = imageInfo
    },
    deleteImage(state, id) {
      state.images.filter((obj, index) => {
        if (obj.id === id) {
          state.images.splice(index, 1);
        }
      });
    },
  },
  getters: {
    getAddr(state) {
      return state.currentCamAddr;
    },
    getPath(state) {
      return state.path;
    },
    getCams(state) {
      return state.cams;
    },
    getImages(state) {
      return state.images;
    },
    getVideos(state) {
      return state.records;
    },
    getCapturedCurrentImage(state) {
      return state.currentCapturedImageBinary;
    },
    getImageById: (state) => (id) => {
      return state.images.find((image) => image.id === id);
    },
  },
});
