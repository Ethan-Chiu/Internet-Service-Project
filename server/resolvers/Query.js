const Post = require('../models/post')
const User = require('../models/user')
const Query = {
	login(parent, args, { db }, info) {
		var state = ""
		const func = async() => {
			await new Promise(resolve => {
				User.find({ account: args.account })
					.exec((err, res) => {
						if (err) throw err
						if (res.length === 0) {
							state = "account not found"
						} else if (args.password === res[0].password) {
							console.log("success")
							state = "login success"
						} else {
							console.log("wrong")
							state = "wrong password"
						}
						resolve()
					})
			})
			return state
		}
		return func()
	},
	getPosts(parent, args, { db }, info) {
		const inRange = (post) => {
			return ((post.location.x - args.locale.x) ** 2 +
							(post.location.y - args.locale.y) ** 2 <
							args.locale.s ** 2)
		}
		const func = async() => {
			var x
			await new Promise(resolve => {
				Post.find()
					.exec((err, res) => {
						if (err) throw err
						x=res.filter(inRange)
						resolve()
					})
			})
			return x
		}
		return func()
	},
	getPostFromId(parent, args, { db }, info) {
		const func = async() => {
			var x
			await new Promise(resolve => {
				Post.find({ _id: args.id })
					.exec((err, res) => {
						if (err) throw err
						x = res[0]
						resolve()
					})
			})
			return x
		}
		return func()
	}
	search(parent, args, { db }, info) {
		var titlematch = []
		var tagmatch = []
		var titlefit = []
		var contentfit = []
		const func = async() => {
			await new Promise(resolve => {
				Post.find().exec((err, res) => {
					if (err) throw err
					for (var i=0; i<res.length; i++) {
						if (res[i].title == args.text) {
							titlematch.push(res[i])
						} else if (res[i].tags.includes(args.text)) {
							tagmatch.push(res[i])
						} else if (res[i].title.search(args.text) !== -1) {
							titlefit.push(res[i])
						} else if (res[i].text.search(args.text) !== -1) {
							contentfit.push(res[i])
						}
						resolve()
					}
				})
			})
			matchingposts = contentfit.concat(titlefit)
				.concat(tagmatch).concat(titlematch)
			matchingposts.reverse()
			return matchingposts
		}
		return func()
	},
	getProfile(parent, args, { db }, info) {
		var data = {}
		const func = async() => {
			await new Promise(resolve => {
				User.find({ account: args.account })
					.exec((err, res) => {
						if (err) throw err
						data = res
						resolve()
					})
			})
			if (data.length == 1) {
				return data[0]
			}
		}
		return func()
	}	
}

module.exports = { Query }
