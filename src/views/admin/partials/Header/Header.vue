<template>
  <div class="header-wrapper fluid-container d-flex">
    <h4 class="py-sm-4 py-3 my-0">{{ }}</h4>
    <div class="dropdown py-sm-4 py-3 mt-sm-auto ms-auto flex-shrink-1 me-2">
      <a
        href="#"
        class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
        id="dropdownUser"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="/avatar.jpg"
          alt="hugenerd"
          width="32"
          height="32"
          class="rounded-circle"
        />
        <span class="d-none d-sm-inline mx-1">quytrg</span>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    tilte: {
      type: String,
      default: "Dashboard",
    },
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
