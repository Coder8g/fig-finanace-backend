'use strict'

import * as _ from 'lodash'

export const okResponse = (statusCode, data, message) => {
  return {
    statusCode: statusCode,
    message: message,
    error: false,
    data: data || null
  }
}

export const getFormattedError = error => {
  if (error) {
    if (error.type === 'StripeInvalidRequestError') {
      error = {
        message: error.message,
        code: error.code,
        rawType: error.rawType,
        param: error.param
      }
    }
  } else {
    error = {
      message: 'Unknown error. Please contact support if problem persists',
      code: 'error.unknown',
      rawType: 'Unknown error'
    }
  }
  return error
}

/**
 * Prepare error response
 * @param {Int} statusCode - Status code will be set as statusCod in HTTP response
 * @param {*} err - Contains exception
 * @param {String} message - One line message
 */
export const errorResponse = (statusCode, err, message, reason, redirectTo) => {
  if (err) { console.log(err) }

  // Mongoose validation error
  if (err && err.name === 'ValidationError') {
    statusCode = 400
    for (const field in err.errors) {
      message = `Error : ${err.errors[field].message}`
      break
    }
    // Check if invalid _id supplied
  } else if (err && err.name === 'CastError') {
    err = null
    message = 'Invalid input'
    statusCode = 400
  }

  // Send error: true in production
  const error = process.env.NODE_ENV === 'production' ? true : err

  return {
    statusCode, // HTTP Status Code
    message, // One line message
    error, // Exception detail in development
    data: null, // Extra detail about error
    redirectTo // Where to redirect
  }
}

export const errorFormatter = (res, error) => {
  const statusCode = error.statusCode || 500
  let errorBody = error.data
  if (_.isEmpty(errorBody)) {
    errorBody = {
      message: error.data + ''
    }
    error.data = errorBody
  }
  return res.status(statusCode).json(error)
}
