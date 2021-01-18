const Post = require('../models/post')
const User = require('../models/user')
const Mutation = {
	signup(parent, args, { db }, info) {
		User.find({ account: arg.data.account })
			.exec( async (err, res) => {
				if (err) throw err
				if (res.length !== 0) {
					return "account already exist"
				} else {
					userdata = args.data
					userdata.usertype = "normal"
					await User.create(userdata)
					return "success"
				}
			})
	}
	editProfile(parent, args, { db }, info) {
		User.find({ account: arg.data.account })
		.exec( async (err, res) => {
			if (err) throw err
			await User.updateOne({ account: args.data.account }, { $set: args.data }

	createPost(parent, args, { db }, info) {
		Post.create(args.data)
		return "create successfully"
	}
	like(parent, args, { db }, info) {
		Post.find({ _id: args.id })
			.exec(async (err, res) => {
				if (err) throw err
				var likers = res[0].likes
				var isin = false
				for (var i=0; i<likers.length; i++) {
					if (likers[i] === args.user) {
						isin = true
					}
				}
				if (!isin) {
					likers.push(args.id)
					await Post.updateOne({_id: args.id }, { $set: { likes: likers }})
					return "like"
				} else {
					return "already liked"
				}
			})
	}
	unlike(parent, args, { db }, info) {
		Post.find({ _id: args.id })
			.exec(async (err, res) => {
				if (err) throw err
				var likers = res[0].likes
				for (var i=0; i<likers.length; i++) {
					if (likers[i] === args.user) {
						likers.splice(i, 1)
						await Post.updateOne({ _id: args.id }, { $set: { likes: likers }})
						return "unlike"
						break
					}
				}
				return "not liked"
			})
	}
	commet(parent, args, { db }, info) {
		Post.find({ _id: args.id })
			.exec(async (err, res) => {
				if (err) throw err
				var texts = res[0].comments
				texts.push({ user: args.user, text: args.text })
				await Post.updateOne({ _id: args.id }, { $set: { comments: texts }})
				return "comment successfully"
			})
	}
	deletecomment(parent, args, { db }, info) {
		Post.find({ _id: args.id })
			.exec(async (err, res) => {
				if (err) throw err
				var texts = res[0].comments
				for (var i=0; i<texts.length; i++) {
					if (texts[i] === args.text) {
						texts.splice(i, 1)
						await Post.updateOne({ _id: args.id }, { $set: { comments: texts }})
						return "deleted successfully"
						break
					}
				}
			})
	}
}
module.exports = { Mutation }
