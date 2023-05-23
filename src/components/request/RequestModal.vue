<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{ invalid: fError }">
      <label for="name">ФИО</label>
      <input type="text" id="name" v-model="fullName" @blur="fBlur"/>
      <small v-if="fError">{{ fError }}</small>
    </div>

    <div class="form-control" :class="{ invalid: pError }">
      <label for="phone">Телефон</label>
      <input type="phone" id="phone" v-model="phone" @blur="pBlur"/>
      <small v-if="pError">{{ pError }}</small>
    </div>

    <div class="form-control" :class="{ invalid: aError }">
      <label for="amount">Сумма заявки</label>
      <input type="number" id="amount" v-model.number="amount" @blur="aBlur"/>
      <small v-if="aError">{{ aError }}</small>
    </div>

    <div class="form-control">
      <label for="status">Статус</label>
      <app-select id="status" v-model:status="status"></app-select>
    </div>

    <button class="btn primary" :disabled="isSubmitting" type="submit">Создать</button>
  </form>
</template>

<script>
import { useStore } from 'vuex'
import useRequestForm from '@/use/request-form'
import AppSelect from '../ui/AppSelect.vue'

export default {
  emits: ['created'],
  setup (_, { emit }) {
    const store = useStore()

    // Я вызываю метод сабмит из компонента для того, чтобы передать emit в HomeView и там его вызвать для закрытия модалки
    const submit = async values => {
      await store.dispatch('request/create', values)
      emit('created')
    }

    return { ...useRequestForm(submit) }
  },
  components: { AppSelect }
}
</script>

<style>

</style>
