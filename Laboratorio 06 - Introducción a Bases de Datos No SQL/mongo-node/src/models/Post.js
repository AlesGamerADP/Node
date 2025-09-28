import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {type : String, minLength : 5 , maxLength: 30 , required: true},
    content: {type: String , minLength : 10 , required : true},
    hashtags: [{ type: String }],
    ImageUrl : String,
    createAt : {type : Date, default: Date.now },
    updateAt : {type : Date},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Post", postSchema);

