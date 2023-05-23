<template>
  <select :id="id" @input="change" :value="status" :disabled="isDisabled">
    <slot name="choice" />
    <option value="active">Активен</option>
    <option value="process">Выполняется</option>
    <option value="done">Завершен</option>
    <option value="cancel">Отменен</option>
  </select>
</template>

<script>
export default {
  emits: ['update:status'],
  props: {
    id: {
      type: String
    },
    status: {
      type: String
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  setup (_, { emit }) {
    const change = (event) => {
      emit('update:status', event.target.value)
    }

    return {
      change
    }
  }
}
</script>

<style>

</style>
