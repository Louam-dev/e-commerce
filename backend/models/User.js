//We will use mongoose for DB object modeling.
//Mongoose provides a schema-based solution to model application data includes built-in type casting, validation, query building, business logic
const mongoose= require('mongoose');

const  UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, //Email is the User Key, One per user.
    },
    password: {
        type:String,
        required: true,
    },
    avatar: {
        type: String,
    },
    role: {// Roles for user it will be (normal or admin)
        type: Number,
        default: 0,
    },
    history:{
        //Order history
        type: Array,
        default: [],
    },
});

module.exports = User =mongoose.model('User',UserSchema);