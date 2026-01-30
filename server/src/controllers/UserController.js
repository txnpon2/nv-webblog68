const {User} = require('../models')

module.exports = {
  // ดึงข้อมูลผู้ใช้ทั้งหมด (get all users)
  async index (req, res) {
    try {
      const users = await User.findAll()
      res.send(users)
    } catch (err) {
      res.status(500).send({
        error: 'The users information was incorrect'
      })
    }
  },

  // สร้างผู้ใช้ใหม่ (create user)
  async post (req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create the user'
      })
    }
  },

  // แก้ไขข้อมูลผู้ใช้ (edit user)
  async put (req, res) {
    try {
      await User.update(req.body, {
        where: {
          id: req.params.userId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to update the user'
      })
    }
  },

  // ลบผู้ใช้ (delete user)
  async delete (req, res) {
    try {
      const user = await User.findOne({
        where: {
          id: req.params.userId
        }
      })

      if (!user) {
        return res.status(403).send({
          error: 'The user information was incorrect'
        })
      }

      await user.destroy()
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to delete the user'
      })
    }
  },

  // ดูข้อมูลผู้ใช้รายบุคคล (show user)
  async show (req, res) {
    try {
      const user = await User.findByPk(req.params.userId)
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'The user information was incorrect'
      })
    }
  }
}