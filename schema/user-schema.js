import mongoose from "mongoose";
import jwt from 'jsonwebtoken';



const userSchema=new mongoose.Schema({
    fName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    cpass:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages:[{ 
            fName:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            phone:{
                type:Number,
                required:true
            },
            msg:{
                type:String,
                required:true,
            }
        
    }],
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
//we are generating token
userSchema.methods.generateAuthToken=async function (){
    try{
    let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
    this.tokens=this.tokens.concat({token:token});
    await this.save();
    return token;
        }catch(e)
        {
             console.log(e);
        }
    }

const user=mongoose.model("USER",userSchema);

export default user;