const messagesResolvers = require('./messages');
const userResolvers = require('./users');

module.exports = {
    Query: {
        ...messagesResolvers.Query
        ...userResolvers.Query
    },
    Mutation: {
        ...messagesResolvers.Mutation
    },
};