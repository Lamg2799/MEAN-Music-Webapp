var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    audio_file : {type:String, require:true},
    image_file : {type:String, require:true},
    artist: {type:String, require:true},
    genre:{type:String, require:true},
    title:{type:String, require:true},
    created_date:{type: Date, default: new Date(), require:true},
});

module.exports = mongoose.model('Music',schema);