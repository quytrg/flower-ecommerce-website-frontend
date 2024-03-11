<template>
  <div class="container py-5">
    <div class="row justify-content-center align-items-center">
      <div class="authentication position-relative col-12 col-md-7 col-sm-10">
        <div class="authentication-wrapper">
          <v-form fast-fail validate-on="submit lazy" @submit.prevent="handleSubmit">
            <div>
              <v-card
                class="mx-auto pa-12 pb-8"
                elevation="8"
                max-width="448"
                rounded="lg"
              >
                <div class="d-flex justify-content-center align-items-center mb-7 mx-3">
                  <img 
                    src="https://res-console.cloudinary.com/dszbsfjzs/media_explorer_thumbnails/3abe8fe14126b2d0d791598a66213c4c/detailed" 
                    alt="logo"
                    style="
                      width: 48px;
                      aspect-ratio: 1/1;
                      object-fit: cover;
                    "
                  >
                  <v-card-title class="text-h4 text-grey-darken-2 ps-2">
                    Kyiv Admin
                  </v-card-title>
                </div>
                <v-text-field
                  v-model="email"
                  label="Email"
                  placeholder="quy2k3@gmail.com"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  color="deep-purple-accent-1"
                  :rules="emailRules"
                ></v-text-field>

                <div
                  class="d-flex align-center justify-end"
                >
                  <a
                    class="text-decoration-none text-deep-purple-accent-1 text-subtitle-1"
                    href="#"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Forgot password?
                  </a>
                </div>

                <v-text-field
                  v-model="password"
                  :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'" 
                  :type="visible ? 'text' : 'password'"
                  label="Password"
                  placeholder="..............."
                  prepend-inner-icon="mdi-lock-outline"
                  variant="outlined"
                  color="deep-purple-accent-1"
                  @click:append-inner="visible = !visible"
                  :rules="passwordRules"
                ></v-text-field>

                <v-card class="mb-8 mt-3" color="surface-variant" variant="tonal">
                  <v-card-text class="text-medium-emphasis text-caption">
                    Warning: After 3 consecutive failed login attempts, you account
                    will be temporarily locked for three hours. If you must login
                    now, you can also click "Forgot login password?" below to reset
                    the login password.
                  </v-card-text>
                </v-card>

                <v-btn block class="mb-5" color="deep-purple-accent-1" size="large" variant="elevated" :loading="loading" type="submit">
                  Log In
                </v-btn>
              </v-card>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/admin/auth.service";
import RoleService from '@/services/admin/role.service'
import { mapActions } from 'pinia'
import { useAccountStore } from '@/stores/admin/account.store'
import { useRoleStore } from '@/stores/admin/role.store'

export default {
  name: "AdminLogin",
  components: {
  },
  props: {},
  data: (vm) => {
    return {
      email: '',
      emailRules: [
        value => {
          if (value) return true
          return 'E-mail is requred.'
        },
        value => {
          if (/.+@.+\..+/.test(value)) return true
          return 'E-mail must be valid.'
        },
        value => vm.login(value)
      ],
      password: '',
      passwordRules: [
        value => {
          if (value) return true
          return 'Password is requred.'
        },
      ],
      visible: false,
      loading: false,
    };
  },
  methods: {
    async handleSubmit(event) {
      this.loading = true
      await event
      this.loading = false
    },
    async login() {
      try {
        this.loginStart()
        return new Promise(async (resolve, reject) => {
          await AuthService.login({
            email: this.email,
            password: this.password
          })
          .then(async (res) => {
            this.loginSuccess(res)
            await this.getRole(res)
            this.$router.push({ name: 'Dashboard'})
            return resolve(true)
          })
          .catch(err => {
            this.loginFailed()
            if (err.response.status === 403) {
              return resolve("Account is locked")
            }
            return resolve("Wrong email or password")
          })
        })
      }
      catch (err) {
        this.loginFailed()
        return "Something went wrong"
      }
    },
    async getRole(account) {
      try {
        this.getRoleStart()
        await RoleService.getById(account?.roleId)
          .then(res => {
            this.getRoleSuccess(res)
          })
          .catch(err => {
            this.getRoleFailed()
          })
      }
      catch (err) {
        this.getRoleFailed()
        console.log(err)
      }
    },
    ...mapActions(useAccountStore, ['loginStart', 'loginSuccess', 'loginFailed']),
    ...mapActions(useRoleStore, ['getRoleStart', 'getRoleSuccess', 'getRoleFailed'])
  },
  computed: {
  }
};
</script>

<style scoped lang="scss">
  .container {
    height: 100vh;
    .row {
      height: 100%;
    }
  }

  
  .authentication-wrapper:before {
    width: 238px;
    height: 233px;
    content: " ";
    position: absolute;
    top: -85px;
    left: 10px;
    background-image: url(https://res.cloudinary.com/dszbsfjzs/image/upload/v1709124043/slhykugugutkoiciqp0s.svg);
  }

  .authentication-wrapper:after {
    width: 180px;
    height: 180px;
    content: " ";
    position: absolute;
    z-index: -1;
    bottom: -70px;
    right: 30px;
    background-image: url(https://res.cloudinary.com/dszbsfjzs/image/upload/v1709124802/m9odiwlcu31voau8ijgg.svg);
  }

</style>
