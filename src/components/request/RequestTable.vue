<template>
  <h4 v-if="!requests.length" class="text-center">Заявок пока нет</h4>
  <table class="table" v-else>
    <thead>
      <tr>
        <th>#</th>
        <th>ФИО</th>
        <th>Телефон</th>
        <th>Сумма</th>
        <th>Статус</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(request, i) in requests" :key="request.id">
        <td>{{ i + 1 }}</td>
        <td>{{ request.fullName }}</td>
        <td>{{ request.phone }}</td>
        <td>{{ currency(request.amount) }}</td>
        <td>
          <app-status :type="request.status"></app-status>
        </td>
        <td>
          <router-link custom :to="{name: 'Request', params: {id: request.id}}" v-slot="{navigate}">
          <button class="btn" @click="navigate">Посмотреть</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import AppStatus from '../ui/AppStatus'
import { currency } from '@/utils/currency'

export default {
  props: ['requests'],
  setup () {
    return { currency }
  },
  components: { AppStatus }
}
</script>

<style>

</style>
