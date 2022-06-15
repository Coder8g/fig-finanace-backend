import express from 'express'
import { errorResponse } from '../../util/HttpResponse.js'
import { HTTP_INTERNAL_SERVER_ERROR } from '../../util/constant.js'
import { fetchEvents, fetchCategories } from '../../services/events/events.service.js'

const router = express.Router()

// Fetch Events
router.get('/', async (req, res, next) => {
  try {
    const result = await fetchEvents(req.query || {})
    res.status(result.statusCode).json(result)
  } catch (error) {
    const result = errorResponse(HTTP_INTERNAL_SERVER_ERROR, error, 'Something went wrong')
    return res.status(result.statusCode).json(result)
  }
})

// Fetch Categories
router.get('/categories', async (req, res, next) => {
  try {
    const result = await fetchCategories(req.query || {})
    res.status(result.statusCode).json(result)
  } catch (error) {
    const result = errorResponse(HTTP_INTERNAL_SERVER_ERROR, error, 'Something went wrong')
    return res.status(result.statusCode).json(result)
  }
})

export default router
