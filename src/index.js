import { GraphQLServer,PubSub } from "graphql-yoga";
import db from "./db";
import Comment from "./resolvers/Comment";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Post from "./resolvers/Post";
import User from "./resolvers/User";
import Subscription from "./resolvers/Subscription";

const pubsub =new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: { Comment, Query, Mutation, Post, User ,Subscription},
  context: {
    db,
    pubsub
  },
});
server.start(() => {
  console.log("server is up ");
});
