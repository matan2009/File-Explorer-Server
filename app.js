const express = require('express')
const app = express()
const indexRouter = require('./index')
const mongo = require('./mongo')
var cors = require('cors')

app.use(cors({origin: '*'})) 
app.use(express.json())
app.use(indexRouter)

mongo.connector()
app.listen(3000, () => console.log("listening on port 3000"))

module.exports = app