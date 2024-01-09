const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  artName: String,
  price: Number
});

module.exports = mongoose.model('Purchase', purchaseSchema);

