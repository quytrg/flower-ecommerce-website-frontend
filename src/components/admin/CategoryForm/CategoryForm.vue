<template>
  <div class="category-form fluid-container mx-5">
    <h4 class="page-title mt-4 mb-0 d-flex align-items-center">
      <h4 class="gray-text">eCommerce</h4>
      <h5 class="mx-1">/</h5> 
      <h4 class="primary-text">{{ pageTitle }}</h4>
    </h4>
    <Form @submit="handleSubmit" :validation-schema="categorySchema">
      <div class="row">
        <div class="mb-3 d-flex justify-content-end">
          <button
            type="submit"
            class="btn btn-main"
          >
            Publish category
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-7">
          <div class="card mb-3 px-2">
            <div class="card-body">
              <h5 class="card-title">Category Information</h5>
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  class="form-control"
                  placeholder="Enter product title"
                  v-model="localCategory.title"
                />
                <ErrorMessage name="title" class="error-feedback text-warning" />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea
                  name="description" 
                  id="description"  
                  class="form-control tiny-editor"
                  v-model="localCategory.description"
                >
                </textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="col-5">
          <div class="card mb-3 px-2">
            <div class="card-body">
              <h5 class="card-title">Organize</h5>
              <div class="mb-3">
                <label for="position" class="form-label">Position</label>
                <Field
                  id="position"
                  name="position"
                  type="number"
                  class="form-control"
                  min="1"
                  placeholder="Auto increase"
                  v-model="localCategory.position"
                />
                <ErrorMessage name="position" class="error-feedback text-warning" />
              </div>
              <hr class="hr-gray">
              <div class="mb-3">
                <div>
                  <label for="status" class="form-label">Status</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    id="active"
                    name="status"
                    type="radio"
                    class="form-check-input"
                    v-model="localCategory.status"
                    value="active"
                    checked
                  />
                  <label for="active" class="form-check-label">Active</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    id="inactive"
                    name="status"
                    type="radio"
                    class="form-check-input"
                    v-model="localCategory.status"
                    value="inactive"
                  />
                  <label for="inactive" class="form-check-label">Inactive</label>
                </div>
                <ErrorMessage name="status" class="error-feedback text-warning" />
              </div>
            </div>
          </div>

          <div class="card mb-3 px-2">
            <div class="card-body">
              <h5 class="card-title">Media</h5>
              <div class="mb-3 col-8">
                <ImageUploadify v-model:cloudURL="localCategory.thumbnails[0]" fname="thumbnail" title="Primary thumbnail"/>
              </div>
              <div class="mb-3 col-8">
                <ImageUploadify v-model:cloudURL="localCategory.thumbnails[1]" fname="thumbnail" title="Secondary thumbnail"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";
  // import MultiSelectCategory from '@/components/admin/MultiSelectCategory/MultiSelectCategory.vue'
  import objectToFormDataHelper from '@/helpers/admin/convert/objectToFormData.helper'
  import ImageUploadify from '@/components/admin/ImageUploadify/ImageUploadify.vue'

  export default {
    name: "ProductForm",
    components: {
      Form,
      Field,
      ErrorMessage,
      ImageUploadify
    },
    emits: ["submit:category"],
    props: {
      category: {
        type: Object,
        default: {
          thumbnails: []
        }
      },
      pageTitle: {
        type: String,
        default: ''
      }
    },
    data() {
      const categorySchema = yup.object().shape({
        title: yup
          .string()
          .required('The title must have value')
          .min(2, "The title must be at least 2 characters")
          .max(50, "The title can have a maximum of 200 characters."),
        position: yup
          .number("The position must be a numerical value") 
          .transform((value, originalValue) => {
            if (originalValue === '') {
              return undefined;
            }
            return value;
          })
          .min(1, "The minimum position is 1")
          .positive("The position must be a positive number")
          .integer("The position must be an integer."),
      })
      return {
        localCategory: this.category,
        categorySchema,
      }
    },
    methods: {
      handleSubmit() {
        // get description form tiny-mce
        this.localCategory.description = tinymce.get("description").getContent();
        
        // convert data to formdata
        const formData = objectToFormDataHelper(this.localCategory)
        this.$emit("submit:category", formData)
      },
    },
    mounted() {
      tinymce.init({
        selector: "textarea.tiny-editor",
      });
    },
  }
</script>

<style scoped lang="scss">

</style>
