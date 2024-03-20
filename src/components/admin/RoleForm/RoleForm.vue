<template>
  <div class="role-form fluid-container mx-5">
    <h4 class="page-title mt-4 mb-0 d-flex align-items-center">
      <h4 class="gray-text">Role Settings</h4>
      <h5 class="mx-1">/</h5> 
      <h4 class="primary-text">{{ pageTitle }}</h4>
    </h4>
    <Form @submit="handleSubmit" :validation-schema="roleSchema">
      <div class="row">
        <div class="mb-3 d-flex justify-content-end">
          <button
            type="submit"
            class="btn btn-main"
          >
            Publish role
          </button>
        </div>
      </div>
      <div class="card mb-3 px-2">
        <div class="card-body">
          <h5 class="card-title">Role Information</h5>
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <Field
              id="title"
              name="title"
              type="text"
              class="form-control"
              placeholder="Enter role title"
              v-model="localRole.title"
            />
            <ErrorMessage name="title" class="error-feedback text-warning" />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea
              name="description" 
              id="description"  
              class="form-control"
              v-model="localRole.description"
            >
            </textarea>
          </div>

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
                v-model="localRole.status"
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
                v-model="localRole.status"
                value="inactive"
              />
              <label for="inactive" class="form-check-label">Inactive</label>
            </div>
            <ErrorMessage name="status" class="error-feedback text-warning" />
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";

  export default {
    name: "RoleForm",
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    emits: ["submit:role"],
    props: {
      role: {
        type: Object,
        default: {}
      },
      pageTitle: ''
    },
    data() {
      const roleSchema = yup.object().shape({
        title: yup
          .string()
          .required('The title must have value')
          .min(2, "The title must be at least 2 characters")
          .max(50, "The title can have a maximum of 200 characters."),
      })
      return {
        localRole: this.role,
        roleSchema,
      }
    },
    methods: {
      handleSubmit() {
        this.$emit("submit:role", this.localRole)
      },
    },
  }
</script>

<style scoped lang="scss">

</style>
