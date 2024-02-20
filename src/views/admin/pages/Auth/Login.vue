<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-4">
        <h3 class="text-center">Login</h3>
        <Form @submit="handleSubmit" :validation-schema="accountSchema">
          <div class="form-group mb-3">
            <label for="email" class="form-label">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              class="form-control"
              v-model="account.email"
            />
            <ErrorMessage name="email" class="error-feedback text-warning" />
          </div>
          <div class="form-group mb-3">
            <label for="password" class="form-label">Password</label>
            <Field
              type="password" 
              name="password" 
              id="password"  
              class="form-control"
              v-model="account.password"
            />
            <ErrorMessage name="password" class="error-feedback text-warning" />
          </div>
          <div class="d-grid">
            <button
              type="submit"
              class="btn btn-primary btn-block"
            >
              Submit
            </button>
          </div>
          
        </Form>
      </div>
    </div>
  </div>
  
</template>

<script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";
  import Swal from 'sweetalert2'
  import AuthService from '@/services/admin/auth.service'
  export default {
    name: "AdminLogin",
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    props: {
    },
    data() {
      const accountSchema = yup.object().shape({
        email: yup
          .string("Email must be a string")
          .required("Email must have a value")
          .email("Invalid email format"),
        password: yup
          .string()
          .required("Password must be provided"),
      })
      return {
        account: {},
        accountSchema,
      }
    },
    methods: {
      async login(account) {
        const state = await AuthService.login(account)
        return state
      },
      handleSubmit() {
        this.login(this.account)
            .then(state => {
              if (state === 'EmailNotExist') {
                Swal.fire({
                  icon: "error",
                  title: "Login failed",
                  text: "Email not exist!",
                });
              }
              else if (state === 'WrongPassword') {
                Swal.fire({
                  icon: "error",
                  title: "Login failed",
                  text: "Wrong password!",
                });
              }
              else if (state === 'Block') {
                Swal.fire({
                  icon: "error",
                  title: "Login failed",
                  text: "Account has been blocked!",
                });
              }
              else {
                this.$router.push({ name: 'Dashboard' })
              }
            })
      }
    },
  }
</script>

<style scoped lang="scss">

</style>
