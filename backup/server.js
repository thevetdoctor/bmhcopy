"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = require("dotenv");
var morgan_1 = __importDefault(require("morgan"));
var http_status_codes_1 = require("http-status-codes");
// import db from '../src/db/index';
var express_graphql_1 = require("express-graphql");
var schema_1 = __importDefault(require("./db/schema"));
// import routes from './routes/index';
dotenv_1.config();
var app = express_1.default();
exports.app = app;
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
var _a = process.env, NODE_ENV = _a.NODE_ENV, APP_PORT = _a.APP_PORT;
app.use(function (err, req, res, next) {
    if (err) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({
            error: http_status_codes_1.getReasonPhrase(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR),
        });
    }
    next();
});
// app.use('/auth', routes);
app.use('/graphql', express_graphql_1.graphqlHTTP({
    schema: schema_1.default,
    pretty: true,
    graphiql: true,
}));
app.get('/', function (req, res) { return res
    .status(http_status_codes_1.StatusCodes.OK)
    .send({
    message: 'Welcome to BuildMyHouse',
    data: {},
}); });
