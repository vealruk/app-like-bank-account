<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Зарегистрируйте аккаунт</h1>

    <div :class="['form-control', {invalid: eError}]">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" @blur="eBlur" />
      <small v-if="eError">{{ eError }}</small>
    </div>

    <div :class="['form-control', {invalid: pError}]">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" @blur="pBlur" />
      <small v-if="pError">{{ pError }}</small>
    </div>

    <button class="btn primary" type="submit" :disabled="isSubmitting || isTooManyAttempts">Регистрация</button>

    <p class="breadcrumbs">
      Есть аккаунт?
      <router-link to="/auth">Войти</router-link>
    </p>
  </form>
</template>

<script>
import useRegisterFrom from '@/use/register-form'

export default {
  setup () {
    return { ...useRegisterFrom() }
  }
}
</script>
