const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    username: { type: String, default: null },
    email: { type: String, unique: null },
    password: { type: String },
    token: { type: String }
});

module.exports = model('User', userSchema);