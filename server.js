const schema = require('./schema');
const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;;
const cors = require('cors')
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/graphql',graphqlHTTP({
    schema,
    graphql: true
}))

const PORT = process.env.PORT || 5000 ;

app.listen
(
    PORT,
    () =>console.log(`Server started on port ${PORT}`)
);
