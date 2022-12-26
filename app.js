/* Env Setting */
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}
const PORT = process.env.PORT

/* Necessary Packages  */
const express = require('express')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/* db */
const db = require('./models')
const { Staff } = db

/* App use */
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))

app.post('/api/staffs/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.json({
        status: 'error',
        message: '信箱及密碼不可空白'
      })
    }
    const staff = await Staff.findOne({ where: { email } })
    // 檢查 staff 是否存在與
    if (!staff)
      return res.status(401).json({ status: 'error', message: '信箱不存在！' })
    // 密碼是否正確
    if (!bcrypt.compareSync(password, staff.password)) {
      return res.status(401).json({ status: 'error', message: '密碼錯誤' })
    }
    // 簽發 token
    const payload = { id: staff.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return res.json({
      status: 'success',
      message: '登入成功!',
      token,
      staff: {
        id: staff.id,
        name: staff.name,
        email: staff.email
      }
    })
  } catch (err) {
    console.log(err)
  }
})

app.post('/api/staffs/register', async (req, res) => {
  try {
    // 資料不可為空白
    const { name, email, password, checkPassword } = req.body
    if (!name || !email || !password || !checkPassword) {
      return res.json({
        status: 'error',
        message: '所有欄位皆不可空白！'
      })
    }
    // 確認checkPassword、password相同
    if (checkPassword !== password) {
      return res.json({
        status: 'error',
        message: '密碼確認不符！'
      })
    }
    // 確認Email無重複
    const staff = await Staff.findOne({ where: { email } })
    if (staff) {
      return res.json({
        status: 'error',
        message: 'email 已重覆註冊！'
      })
    }
    if (name.length > 50 || password.length > 20) {
      return res.json({
        status: 'error',
        message: '字數超出上限！'
      })
    }
    // 建立staff
    await Staff.create({
      name,
      email,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
    })
    return res.status(200).json({ status: 'success', message: '註冊成功!' })
  } catch (err) {
    console.log(err)
  }
})

app.get('/', (req, res) => {
  res.send('Time Punch APP')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
