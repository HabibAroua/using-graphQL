const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLObject,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const authors = [
    {id: 1, name:'John Doe'},
    {id: 2, name:'Amit Kumar'},
    {id: 3, name:'Prashant Surya'}
];

const books = [
    {id:1, name:'SQL Interview Question', authorId: 1},
    {id:2, name:'Angular Interview Question', authorId: 2},
    {id:3, name:'MongoDB Interview Question', authorId: 2},
    {id:4, name:'C# Interview Question', authorId: 2},
    {id:5, name:'Java Interview Question', authorId: 3},
    {id:6, name:'Perl Interview Question', authorId: 1},
    {id:7, name:'PHP Interview Question', authorId: 2},
    {id:8, name:'JavaScript Interview Question', authorId: 3},
];

const AuthorType = new GraphQLObjectType({
    name: 'AuthorType',
    description: '',
    fields: () => ({
        id: {type: GraphQLInt},
        name: { type: GraphQLString},
        books: {
            type: new GraphQLList(BookType),
            description: 'List of all books by the author',
            resolve: (author) => { // we will have to use filter , as the return type is list of BookType
                return books.filter(b => b.authorId == author.id)
            }
        }
    })
});

const BookType = new GraphQLObjectType({
    name: 'BookType',
    description: '',
    fields: () => ({
        id: {type: GraphQLInt},
        name: { type: GraphQLString},
        authorId: { type: GraphQLInt},
        authorName: {
            type:GraphQLString,
            description: '',
            resolve:(book) => //it gives us the parent data
            {
                let author = authors.find(a =>a.id === book.authorId);
                return author.name;
            }
        }
    })
});


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
        },
        greet: {
            type: GraphQLString,
            description: 'Greet Field',
            resolve: () =>{
                return 'Welcome to GraphQL Learing'
            }
        },
        books: {
            type: new GraphQLList(BookType), //custom type will make later
            description: 'List of Books',
            resolve: () => {
                return books ;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType), // custom type will make later
            description: 'List of Authors',
            resolve: () => {
                return authors ;
            }
        }
    })
})

const MutationType = new GraphQLObjectType({
    name: "MutationOperations",
    description: 'Mutation operations on books',
    fields: () => ({
        addBook: {
            type: BookType,
            description: '',
            args: { //these are the arguments which will pass when with the addBopok query
                name: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parent, args) => {
                let newBook = { id: books.length + 1, name: args.name, authorId: args.authorId  }
                books.push(newBook);
                return newBook;
            }
        },
        updateBook: {
            type: BookType,
            description: 'It will update a book bassed on given book id',
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                id: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                let book = books.find(b => b.id == args.id)
                book.name = args.name
                return book;
            }
        },
        removeBook: {
            type: GraphQLList(BookType),
            description: 'It will remove a book bassed on given book id',
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                let book = books.filter(b=> b.id != args.id)
                books = book;
                return book;
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: MutationType
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(5000, ()=>{
    console.log('Server is listening on port 5000');
})