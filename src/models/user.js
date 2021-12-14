const {Schema, model} = require('mongoose');

const userSchema = Schema({
    name: {
        type: String
    },
    document: {
        type: Number
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
},{
    collection: "Usuarios"
});

module.exports = model('User', userSchema);