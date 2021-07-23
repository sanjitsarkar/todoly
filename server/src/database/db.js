const  mongoose   =  require("mongoose");
const mongoDB = 'mongodb://127.0.0.1/xanjit';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = databse