const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
	author:		{ type: String, required: true },
	location:	{ type: { x: Number, y: Number }, required: true },
	type:			{ type: String, required: true },
	title:		{ type: String, required: true },
	text:			{ type: String },
	picture:	{ type: String },
	tags:			{ type: Array },
	likes:		{ type: Number, default: 0},
	comments:	{ type: Array, default: [] },
	time:			{ type: Date, default: Date.now }
}, {
	collection:	"Post"
})

const Post = mongoose.model("Post", PostSchema)

module.exports = Post
