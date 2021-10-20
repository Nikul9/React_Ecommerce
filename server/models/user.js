const mongoogse = require('mongoose')
const {ObjectId} = mongoogse.Schema;

const userSchema = new mongoogse.Schema({
     type : String,
     email : {
        type : String,
        required : true,
        index : true
     },
     role : {
        type : String,
        default : "subscribe",
     },
     cart : {
         type : Array,
         default : []
     },
     address : {
         type : String
     },
     wishlist : [{
            type : ObjectId , 
            ref : "Product"
     }]
},{timeStamp : true })

module.exports = mongoogse.model("User" , userSchema)