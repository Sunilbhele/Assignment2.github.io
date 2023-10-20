const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://bhelesunil12:p6PfO7Gs1nTCxq0T@cluster0.i53nmje.mongodb.net/Marketplace?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

const connection = mongoose.connection;

module.exports = connection;

