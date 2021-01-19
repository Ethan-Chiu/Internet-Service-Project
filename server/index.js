require("dotenv-defaults").config();

const { GraphQLServer, PubSub } = require('graphql-yoga')
import { Query } from "./resolvers/Query"
import { Mutation } from "./resolvers/Mutation"

const mongoose = require("mongoose");

const Post = require("./models/post")
const User = require("./models/user")

if (!process.env.MONGO_URL) {
	console.error("Missing MONGO_URL!!!");
	process.exit(1);
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

const server = new GraphQLServer({
	typeDefs: "./server/schema.graphql",
	resolvers: {
		Query,
		Mutation
	},
	context: {
		db
	}
})

db.on('error', (error) => {
  console.error(error)
})

db.once('open', () => {
  console.log('MongoDB connected!')

  server.start({ port: process.env.PORT | 4000 , bodyParserOptions: { limit: "64mb"}}, () => {
		console.log(`The server is up on port ${process.env.PORT | 4000}!`)
	})
})