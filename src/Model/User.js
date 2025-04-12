const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role : {
        type : String,
        enum : ['admin', 'editor', 'guest'],
        default : 'guest'
    },
    name: {
        type : String,
        required : function(){
            return this.role.includes('admin') || this.role.includes('editor');
        }
    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required: true
    },
    alias: {
        type : String,
        required : true
    
}}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);