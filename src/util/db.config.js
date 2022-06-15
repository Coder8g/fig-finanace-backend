import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mongoose = require('mongoose')

// help to debug mongoose
if (process.env.NODE_ENV !== 'production') { mongoose.set('debug', process.env.MONGOOSE_DEBUG ? JSON.parse((process.env.MONGOOSE_DEBUG).toLowerCase()) : true) }

const uri = process.env.MONGO_URL

const options = {
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
  keepAlive: true,
  useUnifiedTopology: true
}

try {
  mongoose.connect(uri, options)
} catch (error) {
  console.log(error)
  process.exit(1)
}

