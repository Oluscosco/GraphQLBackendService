const User = require('../../models/User');
const { ApolloError } = require('apollo-server-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    Mutation: {
        async registerUser(_, {registerInput: {username, email, password} }) {
            // Check to ensure that emails has not been used before
            const oldUser = await User.findOne({ email });

            // throw error if that user exists
            if(oldUser) {
                throw new ApolloError('Email is already registered' + email, 'EMAIL_ALREADY_USED')
            }

            // Encrypt the password
            var encryptedPassword = await bcrypt.hash(password, 10);

            // Build mongoose model
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                PASSWORD: encryptedPassword
            })

            // create JWT token (link it to our user model)
            const token = jwt.sign(
                { user_id: newUser._id, email },
                "STORED_STRING",
                {
                    expiresIn: "1hr"
                }
            );

            newUser.token = token;

            // Save user in MongoDB
            const res = await newUser.save();

            return {
                id: res.id,
                ...res._doc
            }
        },
        async loginUser(_, {loginInput: {email, password} }) {
            // Check if user already exist with the email
            const user = await User.findOne({ email });

            // check if the password equals the encrypted password
            if (user && (await bcrypt.compare(password, user.password))) {

            //create a new Token
            const token = jwt.sign(
                { user_id: newUser._id, email },
                "STORED_STRING",
                {
                    expiresIn: "1hr"
                }
            );
            // Link token to the user model that we found above
                user.token = token;

                return {
                    id: user.id,
                    ...user._doc
                }
            } else {
                // If user doesn't exist, return error
                throw new ApolloError('Wrong password',  'PASSWORD_INCORRECT')
            }
            
        } 
    },
    Query: {
        message: (_, {ID}) => User.findById(ID)
    }
}