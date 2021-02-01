//npm install mongoose

var mongoose = require('mongoose');

var studSchema = mongoose.Schema({
    rno:Number,
    name: String,
    course: String,
    fees:Number
}, {
    timestamps: true
});



module.exports = mongoose.model('stud', studSchema);