<template>
  <div class="multiselect">
    <VueMultiselect
      v-model="selected"
      :options="categories"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      placeholder="Pick some"
      label="title"
      track-by="title"
      :preselect-first="true"
      @update:model-value="handleSelect"
    >
    </VueMultiselect>
  </div>
</template>

<script>
import CategoryService from '@/services/admin/category.service'
import VueMultiselect from 'vue-multiselect'
export default {
  name: "MultiSelectCategory",
  components: { VueMultiselect },
  props: {
    selectedCategories: {
      type: Object,
    }
  },
  emits: ['update:selectedCategories'],
  data () {
    return {
      selected: null,
      categories: [],
    }
  },
  methods: {
    handleSelect() {
      this.$emit('update:selectedCategories', this.selected)
    },
    async getAllCategories() {
      try {
        const filter = {
          params: {
            status: 'active'
          }
        }
        const result = await CategoryService.getAll(filter)
        this.categories = result.map(item => {
          return {
            title: item.title,
            _id: item._id
          }
        })
      }
      catch(err) {
        console.log(err)
      }
    },
  },
  created() {
    this.getAllCategories()
    this.selected = this.selectedCategories
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped lang="scss">

</style>
