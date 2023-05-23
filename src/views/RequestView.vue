<template>
  <AppLoader v-if="loading"/>
  <app-page title="Заявка" v-else-if="request" back>
    <p><strong>Имя заявителя:</strong> {{ request.fullName }}</p>
    <p><strong>Телефон:</strong> {{ request.phone }}</p>
    <p><strong>Сумма:</strong> {{ currency(request.amount) }}</p>
    <p>
      <strong>Статус: </strong>
      <app-status :type="status"/>
    </p>

    <div class="form-control">
      <app-select v-model:status="status"></app-select>
    </div>

    <button class="btn danger" @click="remove">Удалить</button>
    <button class="btn" @click="update" v-if="hasChanges">Обновить</button>
  </app-page>
  <h3 class="text-center text-white" v-else>Заявки с таким id: <strong>{{ $route.params.id }}</strong> не существует.</h3>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, onMounted, computed } from 'vue'
import { currency } from '@/utils/currency'
import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'
import AppStatus from '@/components/ui/AppStatus'
import AppSelect from '@/components/ui/AppSelect'

export default {
  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const loading = ref(true)
    const request = ref({})
    const status = ref('')

    onMounted(async () => {
      loading.value = true
      request.value = await store.dispatch('request/loadById', route.params.id)
      status.value = request.value?.status
      loading.value = false
    })

    const hasChanges = computed(() => request.value.status !== status.value)

    const remove = async () => {
      loading.value = true
      await store.dispatch('request/remove', route.params.id)

      if (store.getters['request/requests'].length === 1) {
        store.commit('request/setRequests', [])
      }

      store.dispatch('request/load')
      router.replace('/')
      loading.value = false
    }

    const update = async () => {
      const data = { ...request.value, status: status.value, id: route.params.id }
      await store.dispatch('request/update', data)
      request.value.status = status.value
    }

    return {
      loading,
      request,
      currency,
      remove,
      update,
      status,
      hasChanges
    }
  },
  components: { AppPage, AppLoader, AppStatus, AppSelect }
}
</script>
<style>

</style>
