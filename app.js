const mongoose = require('mongoose');
const app = require('./routes/index');

const { PORT, DATABASE_URL, NODE_ENV } = process.env;
const DB_URL = NODE_ENV === 'production' ? DATABASE_URL : '127.0.0.1:27017/bitfilmsdb';

mongoose.set('strictQuery', false);
mongoose.connect(`mongodb://${DB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {

});
