<template>
  <div>
    <h2>Get all users</h2>
    <h4>จำนวนผู้ใช้งาน {{ users.length }}</h4>
    
    <p>
      <button v-on:click="navigateTo('/user/create')">สร้างผู้ใช้งาน</button>
      <button v-on:click="logout">Logout</button>
    </p>
    
    <div v-for="user in users" v-bind:key="user.id">
      <p>id: {{ user.id }}</p>
      <p>ชื่อ-นามสกุล: {{ user.name }} - {{ user.lastname }}</p>
      <p>email: {{ user.email }}</p>
      <p>password: {{ user.password }}</p>
      
      <button v-on:click="navigateTo('/user/'+ user.id)">ดูข้อมูลผู้ใช้</button>
      <button v-on:click="navigateTo('/user/edit/'+ user.id)">แก้ไขข้อมูล</button>
      <button v-on:click="deleteUser(user)">ลบข้อมูล</button>
      <hr>
    </div>
  </div>
</template>

<script>
// 1. นำเข้า UsersService (ที่คุณลืม)
import UsersService from '../../services/UsersService' 
import { useAuthenStore } from '../../stores/authen'

export default {
  data () {
    return {
      users: []
    }
  },
  // 2. ดึงข้อมูลเมื่อเปิดหน้าเว็บ
  async created () {
    try {
      this.users = (await UsersService.index()).data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async deleteUser (user) {
      let result = confirm("Want to delete?")
      if (result) {
        try {
          await UsersService.delete(user)
          this.refreshData()
        } catch (err) {
          console.log(err)
        }
      }
    },
    async refreshData() {
      this.users = (await UsersService.index()).data
    },
    // 3. ฟังก์ชัน Logout (ตามบทที่ 9)
    logout () {
      const authenStore = useAuthenStore()
      authenStore.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style scoped>
</style>