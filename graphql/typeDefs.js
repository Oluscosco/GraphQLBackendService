const { gql } = require('apollo-server');

module.exports = gql`
type Message {
    text: String
    createdAt: String
    createdBy: String
}

type User {
    username: String
    email: String
    password: String
    token: String
}

input MessageInput {
    text: String
    username: String
}

input RegisterUserInput {
    username: String
    email: String
    password: String
}

input LoginUserInput {
    email: String 
    password: String
}

type Query {
    message(id: ID!): Message
    user(id: ID!): User
}

type Mutation {
    createMessage(messageInput: MessageInput): Message!
    registerUser(registerInput: MessageInput): User
    loginUser(loginInput: LoginInput): User
}
`