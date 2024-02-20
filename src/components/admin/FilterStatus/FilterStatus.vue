<template>
  <div class="status-list d-flex">
    <div 
      class="status-item" 
      v-for="item in statusList" 
      :key="item.name" 
      @click="handleActive(item.status)"
    >
      <button 
        class="btn btn-sm ms-1 btn-outline-success btn-status" 
        :class="{ 'active': item.status === activedStatus }"
      >
        {{ item.name }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FilterStatus",
    props: {
      activedStatus: {
        type: String,
        default: ''
      }
    },
    emits: ['update:activedStatus'],
    methods: {
      handleActive(status) {
        this.$emit('update:activedStatus', status)
      }
    },
    data() {
      return {
        statusList: [
          {
            name: 'All',
            status: '',
          },
          {
            name: 'Active',
            status: 'active',
          },
          {
            name: 'Inactive',
            status: 'inactive',
          }
        ],
      }
    },
    created() {
    },
  }
</script>

<style scoped lang="scss">
  .btn-status {
    color: #7367f0 !important;
    background-color: #e3e2ff !important;
    border-color: #e3e2ff !important; 
    font-weight: 500;
  }
  .btn-status.active {
    color: #e3e2ff !important;
    background-color: #7367f0 !important;
    border-color: #7367f0 !important; 
  }
</style>
