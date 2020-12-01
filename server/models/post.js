import mongoose from "mongoose"
const Schema = mongoose.Schema

const PostSchema = new Schema({
	index:		{ type: Number, required: true, unique: true },
	author:		{ type: String, required: true },
	location:	{ type: { x: Number, y: Number }, required: true },
	type:		{ type: String, required: true },
	title:		{ type: String, required: true },
	text:		{ type: String },
	picture:	{ type: String },
	tags:		{ type: Array },
	likes:		{ type: Number, default: 0},
	comments:	{ type: Array, default: [] },
	time:		{ type: { date: String, hour: Number, minute: Number }, required: true },
	collection:	"Post"
})

const exportPost = mongoose.model("Post", PostSchema)

export default exportPost
