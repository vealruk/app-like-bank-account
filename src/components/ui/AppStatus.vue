<template>
  <span :class="['badge', className]">{{ text }}</span>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['active', 'done', 'cancel', 'process'].includes(value)
      }
    }
  },
  setup (props) {
    const classMap = {
      active: 'primary',
      process: 'warning',
      done: 'primary',
      cancel: 'danger'
    }

    const textMap = {
      active: 'Активен',
      process: 'Выполняется',
      done: 'Завершен',
      cancel: 'Отменен'
    }

    const className = ref(classMap[props.type])
    const text = ref(textMap[props.type])

    watch(props, val => {
      className.value = classMap[val.type]
      text.value = textMap[val.type]
    })

    return {
      className,
      text
    }
  }
}
</script>
