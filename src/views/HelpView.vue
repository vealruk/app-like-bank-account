<template>
  <app-page title="Помощь" back>
    <question-item v-for="question in questions" :question="question" :key="question.title"></question-item>
  </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import QuestionItem from '@/components/question/QuestionsItem'

export default {
  setup () {
    const questions = [
      {
        title: 'Что есть в данной системе?', text: 'Тут есть все, для того, чтобы смотреть, какие заявки вы добавили'
      },
      {
        title: 'Как тут работает авторизация?', text: 'Все реализовано через Firebase'
      }
    ]

    return { questions }
  },
  components: { AppPage, QuestionItem }
}
</script>
