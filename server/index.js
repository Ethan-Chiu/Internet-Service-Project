require("dotenv-defaults").config();

const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const WebSocket = require("ws");
//const socketio = require("socket.io");

const Post = require("./models/post")
const User = require("./models/user")

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
//const io = socketio(server)

if (!process.env.MONGO_URL) {
	console.error("Missing MONGO_URL!!!");
	process.exit(1);
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error) => {
  console.error(error)
})

db.once('open', async() => {
  console.log('MongoDB connected!')
	//const testPost = {	author:		"201jimmy",
											//location:	{ x: 20, y: 1 },
											//type:			"red",
											//title:		"test",
											//text:			"This is a test post.\nThanks!!",
											//picture:	"https://mms.digitimes.com/NewsImg/2010/0908/198234-1-O94IB.jpg",
											//tags:			[ "hello world", "great", "oops" ],
	//}
	//const testUser = {	usertype:	"normal",
											//name:			"David Melingsher",
											//email:		"email@email.com",
											//account:	"dav1205",
											//password:	"1205"
	//}
	Post.find().limit(1000)
		.exec((err, res) => {
			if (err) throw err
		})

  wss.on('connection', ws => {
		const sendData = (data) => {
			ws.send(JSON.stringify(data))
    }

    const sendStatus = (s) => {
      sendData(['status', s])
    }
		const getPosts = (locale) => {
			//TODO
		}

    ws.onmessage = async (message) => {
      const { data } = message
      console.log(data)
      const [task, payload] = JSON.parse(data)

      switch (task) {
        case "login": {
					User.find({ account: payload.account })
						.exec((err, res) => {
							if (err) throw err
							if (res.length === 0) {
								console.log("not found")
								sendData(["login", "not found"])
							} else if (payload.password === res[0].password) {
								console.log("success")
								sendData(["login", "success"])
								if (payload.lastappear === undefined) {
									var locale = { x: 0, y: 0, s: 0 }
								} else {
									var locale = payload.lastappear
								}
								var posts = getPosts({ x: 0, y: 0, s: 0 }, locale)
								sendData(["init", posts])
							} else {
								console.log("wrong")
								sendData(["login", "wrong"])
							}
						})
					break
        }
				case "signup": {
					User.find({ account: payload.account })
						.exec( async (err, res) => {
							if (err) throw err
							if (res.length !== 0) {
								sendData(["signup", "same account name"])
							} else {
								userdata = payload
								userdata.usertype = "normal"
								await User.create(userdata)
							}
						})
					break
				}
				case "move": {
					var posts = getPosts(payload.oldlocale, payload.newlocale)
					sendData(["update", posts])
					break
				}
				case "post": {
					Post.create(payload.post)
					break
				}
				case "like": {
					Post.find({ _id: payload.id }).exec(async (err, res) => {
						if (err) throw err
						var likers = res[0].likes
						var isin = false
						for (var i=0; i<likers.length; i++) {
							if (likers[i] === payload.user) {
								isin = true
							}
						}
						if (!isin) {
							likers.push(payload.id)
							await Post.updateOne({ _id: payload.id }, { $set: { likes: likers }})
						}
					})
					break
				}
				case "unlike": {
					Post.find({ _id: payload.id }).exec(async (err, res) => {
						if (err) throw err
						var likers = res[0].likes
						for (var i=0; i<likers.length; i++) {
							if (likers[i] === payload.user) {
								likers.splice(i, 1)
								await Post.updateOne({ _id: payload.id }, { $set: { likes: likers }})
								break
							}
						}
					})
					break
				}
				case "comment": {
					Post.find({ _id: payload.id }).exec(async (err, res) => {
						if (err) throw err
						var texts = res[0].comments
						texts.push({ user: payload.user, text: payload.text })
						await Post.updateOne({ _id: payload.id }, { $set: { comments: texts }})
					})
					break
				}
				case "deletecomment": {
					Post.find({ _id: payload.id }).exec(async (err, res) => {
						if (err) throw err
						var texts = res[0].comments
						for (var i=0; i<text.length; i++) {
							if (texts[i] === payload.comment) {
								texts.splice(i, 1)
								await Post.updateOne({ _id: payload.id }, { $set: { comments: texts }})
								break
							}
						}
					})
					break
				}
				case "search": {
					var titlematch = []
					var tagmatch = []
					var titlefit = []
					var contentfit = []
					Post.find().exec((err, res) => {
						if (err) throw err
						for (var i=0; i<res.length; i++) {
							if (res[i].title == payload) {
								titlematch.push(res[i])
							} else if (res[i].tags.includes(payload)) {
								tagmatch.push(res[i])
							} else if (res[i].title.search(payload) !== -1) {
								titlefit.push(res[i])
							} else if (res[i].text.search(payload) !== -1) {
								contentfit.push(res[i])
							}
						}
					})
					matchingposts = contentfit.concat(titlefit)
						.concat(tagmatch).concat(titlematch)
					matchingposts.reverse()
					sendData(["searchresult", matchingposts])
					break
				}
				case "profile": {
					User.find({ account: payload.account }).exec((err, res) => {
						if (err) throw err
						sendData(res)
					})
					break
				}
				default:
					break
			}
		}
  })

  const PORT = process.env.port || 4000

  server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
  })
})
