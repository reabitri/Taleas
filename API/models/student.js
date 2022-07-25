const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: String,
    Department: String,
    Age: Number
});

module.exports = mongoose.model('Student', studentSchema);
