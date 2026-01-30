import Api from './Api' // ใช้ ./ เพราะอยู่โฟลเดอร์เดียวกัน

export default {
  index (search) {
    return Api().get('users')
  },
  show (userId) {
    return Api().get('user/'+userId)
  },
  post (user) {
    return Api().post('user', user)
  },
  put (user) {
    return Api().put('user/'+user.id, user)
  },
  delete (user) {
    return Api().delete('user/'+user.id)
  }
}