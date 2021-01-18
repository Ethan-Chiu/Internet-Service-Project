const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PhotoSchema = new Schema({
	length:			Number,
	chunkSize:	Number,
	uploadDate:	Date,
	filename:		String,
	md5:				String,
	contentType:String
})

const Photo = mongoose.model("photos.files", PhotoSchema)

module.exports = Photo
