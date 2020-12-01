import mongoose from "mongoose"
const Schema = mongoose.Schema

const UserSchema = new Schema({
	userid:		{ type: Number, required: true, unique: true },
	usertype:	{ type: String, required: true },
	name:		{ type: String, required: true },
	account:	{ type: String, required: true, unique: true },
	password:	{ type: String, required: true },
	picture:	{ type: String },
	collection:	"User"
})

const exportUser = mongoose.model("User", UserSchema)

export default exportUser
