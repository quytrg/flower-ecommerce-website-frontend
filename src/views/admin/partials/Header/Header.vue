<template>
  <div class="header-wrapper fluid-container">
    <!-- <div class="dropdown py-sm-4 py-3 mt-sm-auto ms-auto flex-shrink-1 me-2">
      <a
        href="#"
        class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
        id="dropdownUser"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          :src="account.avatar"
          alt="hugenerd"
          width="32"
          height="32"
          class="rounded-circle"
        />
        <span class="d-none d-sm-inline mx-1">{{ account.fullName }}</span>
      </a>
      <ul
        class="dropdown-menu dropdown-menu-dark text-small shadow"
        aria-labelledby="dropdownUser"
      >
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li>
          <hr class="dropdown-divider" />
        </li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div> -->
    <div class="d-flex justify-content-end p-2">
      <v-menu
        min-width="200px"
        rounded
      >
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-menu-down"
            size="small"
            variant="text"
            v-bind="props"
          ></v-btn>
          <v-btn
            icon
            v-bind="props"
            size="small"
          >
            <v-avatar>
              <v-img
                alt="John"
                :src="currentAccount.avatar"
              ></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-card class="mt-1">
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar>
                <v-img
                  alt="John"
                  :src="currentAccount.avatar"
                ></v-img>
              </v-avatar>
              <h4 class="mt-1">{{ currentAccount.fullName }}</h4>
              <p class="text-caption mt-1">
                {{ currentAccount.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                variant="text"
                rounded
              >
                Edit Account
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                variant="text"
                rounded
              >
                Log out
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useAuthStore } from '@/stores/admin/auth.store'

export default {
  name: "Header",
  props: {
    tilte: {
      type: String,
      default: "Dashboard",
    },
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(useAuthStore, ['currentAccount'])
  }
};
</script>

<style scoped lang="scss">
  @import '@/assets/styles/variable.scss';
  .header-wrapper {
    background-color: #11101d;
    h4 {
      color: $white;
      text-transform: capitalize;
    }

    a:visited {
      color: $white;
    }
  }
</style>
