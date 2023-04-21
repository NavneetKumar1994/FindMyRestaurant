const mongoose= require('mongoose');
const validator= require('validator');

const restaurantSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    imageUrl:{
        type: String,
        validate: {
            validator: function(v){
                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        },
        required: [true, 'Image URL is required']
    },
    location:{
        type:String,
        required: true,
    },
    contactNumber:{
        type: String,
        required: true,
        validate:{
            validator: function(num){
                return (!isNaN(num) && num.length===10);
            },
            message: "Invalid contact number"
        }
    },
    rating:{
        type:Number,
        required: true,
        min:0,
        max:5,
        validate:{
            validator: function(num){
                return num>=0;
            },
           message: "Rating can't be negative!"
        }
    },
    createdAt:{
        type: Date,
        immutable:true,
        required:true,
        default:()=>{
            return Date.now();
        }
     },
     updatedAt:{
        type: Date,
        required:true,
        default:()=>{
            return Date.now();
        }
    }
})


module.exports= mongoose.model("Restaurant",restaurantSchema);