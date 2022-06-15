import moment from "moment";
import { CategoriesModel } from '../../models/category.model.js'

import { errorResponse, okResponse } from '../../util/HttpResponse.js'
import { HTTP_OK, HTTP_INTERNAL_SERVER_ERROR } from '../../util/constant.js'

export const fetchCategories = async () => {
  try {
    let categories = await CategoriesModel.find({})
    categories = categories.map(category => category.toUserJson())
    return okResponse(HTTP_OK,  { categories }, 'categories fetched successfully')
  } catch (error) {
    return errorResponse(HTTP_INTERNAL_SERVER_ERROR, error, 'Something went worng! Please try later')
  }
}
