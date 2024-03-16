<template>
  <div class="account-form fluid-container mx-5">
    <h4 class="page-title mt-4 mb-0 d-flex align-items-center">
      <h4 class="gray-text">Account Settings</h4>
      <h5 class="mx-1">/</h5> 
      <h4 class="primary-text">Account</h4>
    </h4>
    <Form @submit="handleSubmit" :validation-schema="accountSchema">
      <div class="row">
        <div class="mb-3 d-flex justify-content-end">
          <button
            type="submit"
            class="btn btn-main"
          >
            Publish account
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-7">
          <div class="card mb-3 px-2">
            <div class="card-body">
              <h5 class="card-title">Account Information</h5>
              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
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
                </div>
                <div class="col-6">
                  <div class="mb-3">
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
              </div>

              <div class="mb-3 col-8">
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

              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
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
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label for="confirmPassword" class="form-label">Confirm Password (*)</label>
                    <Field
                      type="password" 
                      name="confirmPassword" 
                      id="confirmPassword"  
                      class="form-control"
                      v-model="localAccount.confirmPassword"
                    />
                    <ErrorMessage name="confirmPassword" class="error-feedback text-warning" />
                  </div>
                </div>
              </div>

              <div class="row mb-3 mt-2 d-flex align-items-end">
                <div class="mb-3 col-6">
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
            </div>
          </div>
        </div>  
        <div class="col-5">
          <div class="card mb-3 px-2">
            <div class="card-body">
              <h5 class="card-title">Media</h5>
              <div class="mb-3">
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
        confirmPassword: yup
          .string()
          .required("Confirm password is required")
          .oneOf([yup.ref('password'), null], 'Passwords must match'),
        phone: yup
          .string() 
          .required("Phone number must be provided"),
      })
      return {
        localAccount: this.account,
        accountSchema,
        tab: null
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
