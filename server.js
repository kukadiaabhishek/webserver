// const express = require('express');
// const http = require('http');
// const { ApolloServer } = require('apollo-server-express');
// const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
// const { MongoClient } = require('mongodb');
// const typeDefs = require('./src/schema');
// const resolvers = require('./src/resolver');

// const app = express();
// app.use('/uploads', express.static('src/images'));
// const httpServer = http.createServer(app);
// const mongoURI = 'mongodb+srv://asla:Notyet_91@cluster0.b8yufpc.mongodb.net/?retryWrites=true&w=majority';

// const client = new MongoClient(mongoURI);

// async function startServer() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB Atlas');

//     const db = client.db();

//     const server = new ApolloServer({
//       typeDefs,
//       resolvers,
//       plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//       context: { db },
//     });

//     await server.start();
//     server.applyMiddleware({ app, bodyParserConfig: true });
//     await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
//     console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
//   } catch (error) {
//     console.error('Error connecting to MongoDB Atlas:', error);
//   }
// }

// startServer();
