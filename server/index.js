require('dotenv-defaults').config()

const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const WebSocket = require('ws')

const Post = require("./models/post")
const User = require("./models/user")

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
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
											//account:	"dav1205",
											//password:	"1205"
	//}
	Post.find().limit(1000)
		.exec((err, res) => {
			if (err) throw err
		})
	await Post.updateMany({ title: "te" }, { $inc: { likes: 1 }})

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
					await Post.updateOne({ _id: payload.id }, { $inc: { likes: 1 }})
					break
				}
				case "comment": {
					Post.find({ _id: payload.id }).exec(async (err, res) => {
						if (err) throw err
						var texts = res[0].comments
						console.log(texts)
						texts.push(payload.text)
						await Post.updateOne({ _id: payload.id }, { $set: { comments: texts }})
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
