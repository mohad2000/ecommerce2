import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, "title is required"],
        maxLength : [100, "Should be under 100 characters"],
    },
    description : {
        type : String,
        required : [true, "description is required"],
    },
    price : {
        type: Number,
        required : [true, "price is required"],
        max : [999999, "price should be under 6 digits"],
    },
    category : {
        type: String,
        required : [true, "Category is required"],
    },
    ratings : {
        type: Number,
        default : 0,
    },
    images : [
        {
            public_id : {
                type: String,
                required : true
            },
            url : {
                type: String,
                required : true
            },
        }
    ],
    stock : {
        type :Number,
        required: [true, "Stock is required"],
        max: [9999, "Stock must be under 5 digits"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            name: {type: String, required: true},
            comment: {type: String, required: true},
            rating: {type: Number, required: true},
        },
    ],
    user : {
      type : mongoose.Schema.ObjectId,
      ref : "User"
    },

},{
    timestamps: true,
});


const Product = mongoose.model("Product", productSchema);

export default Product;