import { fetchDocuments } from "../document/document.server"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { GraphQLError } from "graphql"
import jwt from "jsonwebtoken"

const typeDefs = `
    type Document {
        title : String
        email : String
        filename : String
        preview : String
    }

    type Query {
        getDocuments(email : String):  [Document]
    }

    type Subscription {
        documentAdded(documentIDv: ID!): Document
    }
`
const resolvers = {
  Query: {
    getDocuments: async (_: any, { email }: any, context : MyContext) =>{
      if(!context.user) return null
      return await fetchDocuments(email as string)
    } ,
  },
}

interface UserInterface {
  email : string
}

interface MyContext {
  user : UserInterface;
}

let apolloServer = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
})

const startServer = async (apolloServer : ApolloServer<MyContext>)=> {
  return await startStandaloneServer(apolloServer, {
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
  
      const user = await new Promise((resolve,reject)=>{
        jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {

        if (err) reject()

        resolve({email : user.email})
       }) 
      }).catch((error)=>{throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      });
      })
      
      return {user} as MyContext 
    },
    listen : {port:4000}
  });
}

startServer(apolloServer).then((response) => {
  console.log(`🚀 Graphql Server ready at: ${response.url}`)
})
