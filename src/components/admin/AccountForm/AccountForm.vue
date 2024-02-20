<template>
  <Form @submit="handleSubmit" :validation-schema="accountSchema">
    <div class="form-group mb-3">
      <label for="fullName" class="form-label">Full name (*)</label>
      <Field
        id="fullName"
        name="fullName"
        type="text"
        class="form-control"
        v-model="localAccount.fullName"
      />
      <ErrorMessage name="fullName" class="error-feedback text-warning" />
    </div>
    <div class="form-group mb-3">
      <label for="password" class="form-label">Password (*)</label>
      <Field
        type="password" 
        name="password" 
        id="password"  
        class="form-control"
        v-model="localAccount.password"
      />
      <ErrorMessage name="password" class="error-feedback text-warning" />
    </div>
    <div class="row mb-3">
      <div class="form-group mb-3 col-6">
        <label for="email" class="form-label">Email (*)</label>
        <Field
          id="email"
          name="email"
          type="email"
          class="form-control"
          v-model="localAccount.email"
        />
        <ErrorMessage name="email" class="error-feedback text-warning" />
      </div>
      <div class="form-group mb-3 col-6">
        <label for="phone" class="form-label">Phone (*)</label>
        <Field
          id="phone"
          name="phone"
          type="text"
          class="form-control"
          v-model="localAccount.phone"
        />
        <ErrorMessage name="phone" class="error-feedback text-warning" />
      </div>
    </div>
    <div class="row mb-3 d-flex align-items-end">
      <div class="form-group mb-3 col-6">
        <label for="avatar" class="form-label">Avatar</label>
        <Field
          id="avatar"
          name="avatar"
          type="text"
          class="form-control"
          placeholder="url..."
          v-model="localAccount.avatar"
        />
        <ErrorMessage name="avatar" class="error-feedback text-warning" />
      </div>
      <div class="form-group mb-3 col-6">
        <div class="form-check form-check-inline">
          <input
            id="active"
            name="status"
            type="radio"
            class="form-check-input"
            v-model="localAccount.status"
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
              v-model="localAccount.status"
              value="inactive"
            />
            <label for="inactive" class="form-check-label">Inactive</label>
          </div>
          <ErrorMessage name="status" class="error-feedback text-warning" />
        </div>
      </div>
    <button
      type="submit"
      class="btn btn-primary"
    >
      Submit
    </button>
  </Form>
</template>

<script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";
  export default {
    name: "AccountForm",
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    emits: ["submit:account"],
    props: {
      account: {
        type: Object,
        default: {}
      }
    },
    data() {
      const accountSchema = yup.object().shape({
        fullName: yup
          .string()
          .required('The full name must have value')
          .min(2, "The full name must be at least 2 characters")
          .max(200, "The full name can have a maximum of 200 characters."),
        email: yup
          .string("Email must be a string")
          .required("Email must have a value")
          .email("Invalid email format"),
        password: yup
          .string()
          .required("Password must be provided"),
        phone: yup
          .string() 
          .required("Phone number must be provided")
      })
      return {
        localAccount: this.account,
        accountSchema,
      }
    },
    methods: {
      handleSubmit() {
        this.$emit("submit:account", this.localAccount)
      }
    },
    watch: {
      account(newVal) {
        this.localAccount = newVal
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
