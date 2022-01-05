"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var index_1 = __importDefault(require("./index"));
var User = new graphql_1.GraphQLObjectType({
    name: 'User',
    description: 'This is a typical user',
    fields: function () { return ({
        id: {
            type: graphql_1.GraphQLInt,
            resolve: function (user) {
                return user.id;
            },
        },
        firstName: {
            type: graphql_1.GraphQLString,
            resolve: function (user) {
                return user.firstName;
            },
        },
        lastName: {
            type: graphql_1.GraphQLString,
            resolve: function (user) {
                return user.lastName;
            },
        },
        email: {
            type: graphql_1.GraphQLString,
            resolve: function (user) {
                return user.email;
            },
        },
        products: {
            type: new graphql_1.GraphQLList(Product),
            resolve: function (user) {
                return user.getProducts();
            },
        },
    }); },
});
var Product = new graphql_1.GraphQLObjectType({
    name: 'Product',
    description: 'This is a typical product',
    fields: function () { return ({
        id: {
            type: graphql_1.GraphQLInt,
            resolve: function (product) {
                return product.id;
            },
        },
        name: {
            type: graphql_1.GraphQLString,
            resolve: function (product) {
                return product.name;
            },
        },
        description: {
            type: graphql_1.GraphQLString,
            resolve: function (product) {
                return product.description;
            },
        },
        customer: {
            type: User,
            resolve: function (product) {
                return product.getUsers();
            },
        },
    }); },
});
var Query = new graphql_1.GraphQLObjectType({
    name: 'Query',
    description: 'This is the root query',
    fields: function () { return ({
        customers: {
            type: new graphql_1.GraphQLList(User),
            args: {
                id: {
                    type: graphql_1.GraphQLInt,
                },
                email: {
                    type: graphql_1.GraphQLString,
                },
            },
            resolve: function (root, args) {
                return index_1.default.models.user.findAll({ where: args });
            },
        },
        products: {
            type: new graphql_1.GraphQLList(Product),
            args: {
                id: {
                    type: graphql_1.GraphQLInt,
                },
                name: {
                    type: graphql_1.GraphQLString,
                },
                description: {
                    type: graphql_1.GraphQLString,
                },
            },
            resolve: function (root, args) {
                return index_1.default.models.product.findAll({ where: args });
            },
        },
    }); },
});
var Mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    description: 'Functions to manipulate data',
    fields: function () {
        return {
            addUser: {
                type: User,
                args: {
                    firstName: {
                        type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
                    },
                    lastName: {
                        type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
                    },
                    email: {
                        type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
                    }
                },
                resolve: function (_, args) {
                    return index_1.default.models.user.create({
                        firstName: args.firstName,
                        lastName: args.lastName,
                        email: args.email.toLowerCase()
                    });
                }
            },
            addProduct: {
                type: Product,
                args: {
                    name: {
                        type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
                    },
                    description: {
                        type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
                    },
                    customerId: {
                        type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
                    }
                },
                resolve: function (_, args) {
                    return index_1.default.models.product.create({
                        name: args.name,
                        description: args.description,
                        customer: {
                            type: User,
                            resolve: function (_, args) {
                                return index_1.default.models.user.findOne(args.customerId);
                            }
                        }
                    });
                }
            }
        };
    }
});
var Schema = new graphql_1.GraphQLSchema({
    query: Query,
    mutation: Mutation
});
exports.default = Schema;
