const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello World!'
    }
};

let apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

async function startApolloServer(app : any) {
    await apolloServer.start()
    apolloServer.applyMiddleware({app})
}


export {startApolloServer}