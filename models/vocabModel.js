const mongoose = require('mongoose');
const vocabSchema = new mongoose.Schema({
	
	word:String,
	meaning:String
	

});


const Vocab = mongoose.model('Vocab',vocabSchema);

module.exports = Vocab;
