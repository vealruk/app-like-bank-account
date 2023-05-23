<template>
  <app-loader v-if="loading" />
  <app-page title="Список заявок" v-else>
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>

    <request-filter v-model="filter"></request-filter>

    <request-table :requests="requests"></request-table>

    <teleport to='body'>
      <app-modal title="Создать заявку" v-if="modal" @close="modal = false">
        <request-modal @created="modal = false"/>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import AppPage from '@/components/ui/AppPage'
import RequestTable from '@/components/request/RequestTable'
import AppModal from '@/components/ui/AppModal'
import RequestModal from '@/components/request/RequestModal'
import AppLoader from '@/components/ui/AppLoader'
import RequestFilter from '../components/request/RequestFilter'

export default {
  setup () {
    const store = useStore()

    const modal = ref(false)
    const loading = ref(false)
    const filter = ref({})

    onMounted(async () => {
      loading.value = true
      if (store.getters['request/requests'].length === 0) {
        await store.dispatch('request/load')
      }
      loading.value = false
    })

    const requests = computed(() => store.getters['request/requests']
      .filter(request => {
        if (filter.value.name) {
          return request.fullName.toLowerCase().includes(filter.value.name.toLowerCase())
        }
        return request
      })
      .filter(request => {
        if (filter.value.status && filter.value.status !== 'empty') {
          return request.status === filter.value.status
        }
        return request
      })
    )

    return {
      modal,
      requests,
      loading,
      filter
    }
  },
  components: {
    AppPage,
    RequestTable,
    AppModal,
    RequestModal,
    AppLoader,
    RequestFilter
  }
}
</script>
