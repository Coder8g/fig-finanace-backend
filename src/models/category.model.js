import mongoose from 'mongoose'
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
}, {
	timestamps: true
})

schema.methods.toUserJson = function () {
  const data = {
    _id: this._id,
    name: this.name
  }
  return data
}

export const CategoriesModel = mongoose.model('categories', schema)
