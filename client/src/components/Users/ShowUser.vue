<template>
  <div>
    <h1>Show User</h1>
    <div v-if="user">
        <p>id: {{ user.id }}</p>
        <p>ชื่อ-นามสกุล: {{ user.name }} - {{ user.lastname }}</p>
        <p>email: {{ user.email }}</p>
        <p>password: {{ user.password }}</p>
    </div>
    <hr>
    <p>
      <button v-on:click="navigateTo('/users')">กลับ</button>
    </p>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService'

export default {
  data () {
    return {
      user: null
    }
  },
  async created () {
    try {
      let userId = this.$route.params.userId
      this.user = (await UsersService.show(userId)).data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>
<style scoped></style>
