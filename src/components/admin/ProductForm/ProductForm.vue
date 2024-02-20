<template>
  <div class="product-form fluid-container mx-4">
    <h4 class="page-title my-3 d-flex align-items-center">
      <h4 class="gray-text">eCommerce</h4>
      <h5 class="mx-1">/</h5> 
      <h4 class="primary-text">{{ pageTitle }}</h4>
    </h4>
    <Form @submit="handleSubmit" :validation-schema="productSchema">
      <div class="row">
        <div class="mb-3 d-flex justify-content-end">
          <button
            type="submit"
            class="btn btn-main"
          >
            Publish product
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-7">
          <div class="card mb-3 px-2">
            <div class="card-body">
              <h5 class="card-title">Product Information</h5>
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  class="form-control"
                  placeholder="Enter product title"
                  v-model="localProduct.title"
                />
                <ErrorMessage name="title" class="error-feedback text-warning" />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea
                  name="description" 
                  id="description"  
                  class="form-control tiny-editor"
                  v-model="localProduct.description"
                >
                </textarea>
              </div>
            </div>
          </div>
          <div class="card mb-3 px-2">
            <div class="card-body">
              <h5 class="card-title">Media</h5>
              
            </div>
          </div>
        </div>

        <div class="col-5">
          <div class="card mb-3 px-2">
            <div class="card-body">
              <h5 class="card-title">Pricing</h5>
              <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <Field
                  id="price"
                  name="price"
                  type="number"
                  class="form-control"
                  min="0"
                  placeholder="00.00"
                  v-model="localProduct.price"
                />
                <ErrorMessage name="price" class="error-feedback text-warning" />
              </div>
              <div class="mb-4">
                <label for="discountPercentage" class="form-label">Discount percentage</label>
                <Field
                  id="discountPercentage"
                  name="discountPercentage"
                  type="number"
                  class="form-control"
                  min="0"
                  placeholder="00.00"
                  v-model="localProduct.discountPercentage"
                />
                <ErrorMessage name="discountPercentage" class="error-feedback text-warning" />
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
                    v-model="localProduct.status"
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
                    v-model="localProduct.status"
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
              <h5 class="card-title">Organize</h5>
              <div class="mb-3">
                <label for="categories" class="form-label">Categories:</label>
                <MultiSelectCategory 
                  v-model:selectedCategories="localProduct.categories"
                />
              </div>
              <div class="mb-3">
                <label for="position" class="form-label">Position</label>
                <Field
                  id="position"
                  name="position"
                  type="number"
                  class="form-control"
                  min="1"
                  placeholder="Auto increase"
                  v-model="localProduct.position"
                />
                <ErrorMessage name="position" class="error-feedback text-warning" />
              </div>
              <div class="mb-3">
                <label for="stock" class="form-label">Stock</label>
                <Field
                  id="stock"
                  name="stock"
                  type="number"
                  class="form-control"
                  min="1"
                  placeholder="Available product"
                  v-model="localProduct.stock"
                />
                <ErrorMessage name="stock" class="error-feedback text-warning" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row mb-3">
        <div class="mb-3 col-6 imageuploadify-container">
          <label for="thumbnail" class="form-label">Image</label>
          <Field
            id="thumbnail"
            name="thumbnail"
            type="file"
            class="form-control"
            accept="image/*"
            v-model="localProduct.thumbnail"
            @change="handleChangeImage($event)"
          />
          <ErrorMessage name="thumbnail" class="error-feedback text-warning" />
          <div class="imageuploadify" v-if="previewImgURL">
            <img :src="previewImgURL" :alt="localProduct.title">
          </div>
          <div class="imageuploadify" v-else-if="this.localProduct.thumbnail">
            <img :src="this.localProduct.thumbnail" :alt="localProduct.title">
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";
  import MultiSelectCategory from '@/components/admin/MultiSelectCategory/MultiSelectCategory.vue'
  import objectToFormDataHelper from '@/helpers/admin/convert/objectToFormData.helper'
  export default {
    name: "ProductForm",
    components: {
      Form,
      Field,
      ErrorMessage,
      MultiSelectCategory
    },
    emits: ["submit:product"],
    props: {
      product: {
        type: Object,
        default: {}
      },
      pageTitle: ''
    },
    data() {
      const productSchema = yup.object().shape({
        title: yup
          .string()
          .required('The title must have value')
          .min(2, "The title must be at least 2 characters")
          .max(50, "The title can have a maximum of 200 characters."),
        price: yup
          .number("The price must be a numerical value") 
          .required('The price must have value')
          .min(1, "The minimum price is 1")
          .positive("The price must be a positive number"),
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
        stock: yup
          .number("The stock must be a numerical value") 
          .required('The stock must have value')
          .min(1, "The stock position is 1")
          .positive("The stock must be a positive number")
          .integer("The stock must be an integer."),
        discountPercentage: yup
          .number("The discount percentage be a numerical value")
          .required('The discount percentage must have value')
          .min(0, "The discount percentage position is 0")
      })
      return {
        localProduct: this.product,
        productSchema,
        previewImgURL: null
      }
    },
    methods: {
      handleSubmit() {
        // get description form tiny-mce
        this.localProduct.description = tinymce.get("description").getContent();

        // convert data to formdata
        const formData = objectToFormDataHelper(this.localProduct)
        this.$emit("submit:product", formData)
      },
      handleChangeImage(e) {
        try {
          if (this.previewImgURL) {
            URL.revokeObjectURL(this.previewImgURL)
          }
          this.previewImgURL = URL.createObjectURL(e.target.files[0]);
        }
        catch(err) {
          console.log(err)
        }
      }
    },
    mounted() {
      tinymce.init({
        selector: "textarea.tiny-editor",
      });
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
