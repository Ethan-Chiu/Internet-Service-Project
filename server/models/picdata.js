const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DataSchema = new Schema({
	files_id:	Object,
	n:				Number,
	data:			Buffer
})

const Data = mongoose.model("photos.chunks", DataSchema)

module.exports = Data
