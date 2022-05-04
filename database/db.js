import mongoose from "mongoose";

const Connection=async ()=>{
    try{
        const url='mongodb+srv://deepaksingh__26:j7Kb2vJwyeGqzdQ@blogweb.aygsc.mongodb.net/BLOG?retryWrites=true&w=majority'
         await mongoose.connect(url);
         console.log("database connected sucessfully");
    }
    catch(e)
    {
    console.log('error while connecting to the MongoDB',e);
    }
}
export default Connection;