import moment from "moment";
import { EventsModel } from '../../models/events.model.js'
import { CategoriesModel } from '../../models/category.model.js'

import { errorResponse, okResponse } from '../../util/HttpResponse.js'
import { HTTP_OK, HTTP_INTERNAL_SERVER_ERROR } from '../../util/constant.js'


export const fetchEvents = async ({
  category,
  address,
  isVirtual,
  startDate,
  endDate
}) => {
    try {
      let searchCondition = {}

      searchCondition = { $and: [{}] }

      if (category) {
        searchCondition.$and.push({ category: { $in: category.split(",") } })
      }

      if (isVirtual) {
        searchCondition.$and.push({ isVirtual: isVirtual })
      }
      console.log(moment(startDate).toISOString())
      if (startDate && !endDate) {
        searchCondition.$and.push({ date: { $gte: startDate } })
      }
  
      if (endDate && !startDate) {
        searchCondition.$and.push({ date: { $lte: endDate } })
      }
  
      if (startDate && endDate) {
        searchCondition.$and.push({ date: { $gte: startDate, $lte: endDate } })
      }

      if (address) {
        searchCondition.$and.push({
          $or:
            [
              {
                address: {
                  $regex: new RegExp(address, 'i')
                }
              }
            ]
        })
      }

      console.log(JSON.stringify(searchCondition))

      let events = await EventsModel.find(searchCondition)
      return okResponse(HTTP_OK,  { events: events.map(i => i.toUserJson())}, 'events fetched successfully!')
    } catch (error) {
      return errorResponse(HTTP_INTERNAL_SERVER_ERROR, error, 'Something went worng! Please try later')
    }
}

export const fetchCategories = async () => {
  try {
    let categories = await CategoriesModel.find({})
    categories = categories.map(category => category.toUserJson())
    return okResponse(HTTP_OK,  { categories }, 'categories fetched successfully')
  } catch (error) {
    return errorResponse(HTTP_INTERNAL_SERVER_ERROR, error, 'Something went worng! Please try later')
  }
}
