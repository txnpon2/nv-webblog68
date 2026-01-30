<template>
  <div>
    <h1>User Login</h1>
    <form v-on:submit.prevent="onLogin">
      <p>Username: <input type="text" v-model="email" /></p>
      <p>Password: <input type="password" v-model="password" /></p>
      <p><button type="submit">Login</button></p>
      <div class="error" v-if="error">{{error}}</div>
    </form>
  </div>
</template>

<script>
// ถอยหลัง 2 ชั้น (../../) เพื่อออกไปหา services และ stores
import AuthenService from '../../services/AuthenService'
import { useAuthenStore } from '../../stores/authen'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async onLogin () {
      try {
        // 1. ส่ง email/pass ไปขอ Token จาก Server
        const response = await AuthenService.login({
          email: this.email,
          password: this.password
        })
        
        // 2. ถ้าผ่าน จะได้ Token มา ให้เก็บลง Store (Pinia)
        const authenStore = useAuthenStore()
        authenStore.setToken(response.data.token)
        authenStore.setUser(response.data.user)

        // 3. เปลี่ยนหน้าไปที่ Users เพื่อดูข้อมูล
        this.$router.push({
          name: 'users'
        })
      } catch (error) {
        // ถ้า Login ไม่ผ่าน ให้โชว์ Error
        console.log(error)
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
  .error {
    color: red;
  }
</style>