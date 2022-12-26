/* Env Setting */
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}
const PORT = process.env.PORT

/* Necessary Packages  */
const express = require('express')
const methodOverride = require('method-override')

/* App use */
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

require('./routes')(app)
