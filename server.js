const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLObject
} = require('graphql');


const RootQueryType = new GraphQLObjectType({
    name: '_rootQuery',
    description: 'Its a root query graph level',
    fields: () => ({
        test: {
            type: GraphQLString,
            description: 'Test field',
            resolve: ()=> {
                return "Habib Aroua"
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(5000, ()=>{
    console.log('Server is listening on port 5000');
})