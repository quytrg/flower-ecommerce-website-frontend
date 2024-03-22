<template>
  <div class="imageuploadify-container">
    <label :for="fname" class="form-label">{{ title }}</label>
    <Field
      :id="fname"
      :name="fname"
      type="file"
      class="form-control"
      accept="image/*"
      @change="handleChangeImage($event)"
    />
    <ErrorMessage :name="fname" class="error-feedback text-warning" />
    <div class="imageuploadify" v-if="previewImgURL">
      <img :src="previewImgURL" :alt="fname">
    </div>
    <div class="imageuploadify" v-else-if="cloudURL">
      <img :src="cloudURL" :alt="fname">
    </div>
  </div>
</template>

<script>
  // import * as yup from "yup";
  import { Field, ErrorMessage } from "vee-validate";
  export default {
    name: "ImageUploadify",
    components: {
      Field,
      ErrorMessage
    },
    props: {
      fname: {
        type: String,
        default: ''
      },
      cloudURL: null,
      title: {
        type: String,
        default: 'Image'
      }
    },
    emits: ['update:cloudURL'],
    data() {
      return {
        previewImgURL: null,
      }
    },
    methods: {
      handleChangeImage(e) {
        try {
          if (this.previewImgURL) {
            URL.revokeObjectURL(this.previewImgURL)
          }
          const file = e.target.files[0]
          this.previewImgURL = URL.createObjectURL(file);
          this.$emit('update:cloudURL', file)
        }
        catch(err) {
          console.log(err)
        }
      }
    },
    unmounted() {
      if (this.previewImgURL) {
        URL.revokeObjectURL(this.previewImgURL)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
