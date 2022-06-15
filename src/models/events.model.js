import mongoose from 'mongoose'
const { Schema } = mongoose;

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true
  },
  isVirtual: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    default: ""
  },
}, {
	timestamps: true
})

schema.methods.toUserJson = function () {
  const data = {
    _id: this._id,
    title: this.title,
    description: this.description,
    category: this.category,
    date: this.date,
    category: this.category,
    isVirtual: this.isVirtual,
    address: this.address
  }
  return data
}

export const EventsModel = mongoose.model('events', schema)
