import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import routes from './routes/index.js'
import events from './routes/events/events.route.js'
import categories from './routes/categories/categories.route.js'

import './util/db.config.js'

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '5mb' }))
app.disable('etag')
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routes)
app.use('/api/v1/events', events)
app.use('/api/v1/categories', categories)

const PORT = 3001;
app.listen(PORT, function () {
  console.log(`Fig Finanace App listening on port ${PORT}!`);
});