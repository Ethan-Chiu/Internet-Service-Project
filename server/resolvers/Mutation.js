const Post = require('../models/post')
const User = require('../models/user')
const Mutation = {
	signup(parent, args, { db }, info) {
		var state = ""
		const func = async() => {
			await new Promise(resolve => {
				User.find({ account: args.data.account })
					.exec( async (err, res) => {
						if (err) throw err
						if (res.length !== 0) {
							state = "account already exist"
						} else {
							userdata = args.data
							userdata.usertype = "normal"
							await User.create(userdata)
							state = "success"
						}
						resolve()
					})
				})
			return state
		}
		return func()
	},
	editProfile(parent, args, { db }, info) {
		var state = ""
		const func = async() => {
			await new Promise(resolve => {
				User.find({ account: args.data.account })
					.exec( async (err, res) => {
						if (err) throw err
						if (res.length !== 0) {
						await User.updateOne({ account: args.data.account }, { $set: args.data })
							state = "updated"
						} else {
							state = "no such account"
						}
						resolve()
					})
			})
			return state
		}
		return func()
	},
	createPost(parent, args, { db }, info) {
		Post.create(args.data)
		return "create successfully"
	},
	like(parent, args, { db }, info) {
		var state = ""
		const func = async() => {
			await new Promise(resolve => {
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
							likers.push(args.user)
							await Post.updateOne({_id: args.id }, { $set: { likes: likers }})
							state = "like"
						} else {
							state = "already liked"
						}
						resolve()
					})
			})
			return state
		}
		return func()
	},
	unlike(parent, args, { db }, info) {
		var state = ""
		const func = async() => {
			await new Promise(resolve => {
				Post.find({ _id: args.id })
					.exec(async (err, res) => {
						if (err) throw err
						var likers = res[0].likes
						for (var i=0; i<likers.length; i++) {
							if (likers[i] === args.user) {
								likers.splice(i, 1)
								await Post.updateOne({ _id: args.id }, { $set: { likes: likers }})
								state = "unlike"
								resolve()
								break
							}
						}
						if (state === "") {
							state = "not liked"
							resolve()
						}
					})
			})
			return state
		}
		return func()
	},
	comment(parent, args, { db }, info) {
		var state = ""
		const func = async() => {
			await new Promise(resolve => {
				Post.find({ _id: args.id })
					.exec(async (err, res) => {
						if (err) throw err
						var texts = res[0].comments
						texts.push({ user: args.user, text: args.text })
						await Post.updateOne({ _id: args.id }, { $set: { comments: texts }})
						state = "comment successfully"
						resolve()
					})
			})
			return state
		}
		return func()
	},
	deleteComment(parent, args, { db }, info) {
		var state = ""
		const func = async() => {
			await new Promise(resolve => {
				Post.find({ _id: args.id })
					.exec(async (err, res) => {
						if (err) throw err
						var texts = res[0].comments
						for (var i=0; i<texts.length; i++) {
							if (texts[i].text === args.text && texts[i].user === args.user) {
								texts.splice(i, 1)
								await Post.updateOne({ _id: args.id }, { $set: { comments: texts }})
								state = "deleted successfully"
								resolve()
								break
							}
						}
					})
			})
			return state
		}
		return func()
	}
}
module.exports = { Mutation }
