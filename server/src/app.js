let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors') // 1. ต้องมีบรรทัดนี้

const {sequelize} = require('./models')
const config = require('./config/config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors()) // 2. ต้องเรียกใช้ cors ตรงนี้ เพื่อแก้ปัญหา Permission

require('./userPassport')
require('./routes')(app)

let port = config.port || 8081

sequelize.sync({force: false}).then(() => {
    app.listen(port, function () {
        console.log('Server running on ' + port)
    })
})