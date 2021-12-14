const mongoose = require('mongoose');
const { url } = require('./urlDb');

class ConnDb{
    constructor(){
        this.connection();
    }
    async connection(){
        this.conn = await mongoose.connect(url);
    }
}

module.exports = ConnDb;