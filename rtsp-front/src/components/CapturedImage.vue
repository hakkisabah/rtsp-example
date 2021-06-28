<template>
  <v-row>
    <div class="d-flex flex-column justify-space-between align-center mt-5">
      <strong>Images</strong>
    </div>
    {{getImages}}
    <template v-for="(n,i) in images">
      <v-col :key="n" class="mt-2" cols="12">
        <strong>Cam {{n}} Images </strong>
      </v-col>
      {{images[i]}}
<!--      <v-col :key='`${n}${i}`' cols="6" md="2">-->
<!--        <v-img @click='edit(images[i].imageInfo)' :src="images[i].imageInfo.imageData"></v-img>-->
<!--      </v-col>-->
    </template>
    <imageEdit v-if='isEdit' @editDialog='isEdit = $event' :editDialog='isEdit' :editInfo='selectedEdit'></imageEdit>
  </v-row>
</template>

<script>
import imageEdit from './imageEdit';
export default {
  name: "CapturedImage",
  components: { imageEdit },
  data(){
    return{
      isEdit:false,
      selectedEdit:null,
      images:null,
    }
  },
  computed:{
    getImages(){
      return this.images
    }
  },
  watch:{
    getImages: (newVal) =>{
      console.log(newVal)
    }
  },
  methods:{
    edit(imageInfo){
      this.selectedEdit = imageInfo
      this.isEdit = true
    }
  },
  mounted() {
    this.images = this.$store.getters.getImages
    console.log(JSON.stringify(this.images))
  }
};
</script>

<style scoped></style>
