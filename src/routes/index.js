import express from 'express'
import { okResponse } from '../util/HttpResponse.js'

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json(okResponse(200, null, 'Fig Finanace Assignment Backend is up & running'))
})

export default router
