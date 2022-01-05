import express from 'express';
import parser from 'body-parser';
import CORS from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
import routes from './routes/index';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
 
dotenv.config();
const app = express();

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);
 
const root = { hello: () => 'Hello world!' };
 
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.use(CORS());
app.use(parser.urlencoded({ extended: true }));

const { NODE_ENV, APP_PORT } = process.env;
console.log(NODE_ENV, APP_PORT);


app.use(morgan('dev'));
app.use('/auth', routes);

app.use((err, req, res, next) => {
    if(err) {
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
            error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        });
    }
});

app.get('/', (req, res) => {
   
    return res
    .status(StatusCodes.OK)
    .send({
        message: 'Welcome to BuildMyHouse',
        data: {}
    });
});

app.listen(APP_PORT, () => {
    `Server started @: ${APP_PORT}`;
});

