const mongoose = require('mongoose');
const app = require('./routes/index');
const { DEV_DATABASE_URL } = require('./constants/devCredentials');

const { PORT, DATABASE_URL, NODE_ENV } = process.env;
const DB_URL = NODE_ENV === 'production' ? DATABASE_URL : DEV_DATABASE_URL;

mongoose.set('strictQuery', false);
mongoose.connect(`mongodb://${DB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {

});
