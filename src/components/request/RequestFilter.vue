<template>
  <div class="filter">
    <div class="form-control">
      <input type="text" placeholder="Поиск" v-model="name" :disabled="isDisabled">
    </div>
    <div class="form-control">
      <app-select v-model:status="status" :isDisabled="isDisabled">
        <template #choice>
          <option disabled selected value="empty">Выбрать статус</option>
        </template>
      </app-select>
    </div>
    <button class="btn warning" v-if="isActive" @click="reset">Очистить</button>
  </div>
</template>

<script>
import AppSelect from '../ui/AppSelect'
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup (_, { emit }) {
    const store = useStore()
    const name = ref()
    const status = ref('empty')

    watch([name, status], values => {
      emit('update:modelValue', {
        name: values[0],
        status: values[1]
      })
    })

    const isActive = computed(() => name.value || (status.value && status.value !== 'empty'))

    return {
      name,
      status,
      isActive,
      isDisabled: computed(() => store.getters['request/requests'].length === 0),
      reset: () => {
        name.value = ''
        status.value = 'empty'
      }
    }
  },
  components: { AppSelect }
}
</script>

<style>

</style>
