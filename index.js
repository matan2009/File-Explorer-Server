const express = require('express')
const Controller = require('./Controller')

const router = express.Router()

router.get('/', Controller.getDirItems)

router.post('/add', Controller.postAddItem)

router.put('/update', Controller.putUpdateItem)

router.delete('/remove', Controller.deleteRemoveItem)

module.exports = router