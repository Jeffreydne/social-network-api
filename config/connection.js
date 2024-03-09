const mongoose = require('mongoose');

// connect mongoose to my networkDB within mongodb 
mongoose.connect('mongodb://127.0.0.1:27017/networkDB');

module.exports = mongoose.connection;