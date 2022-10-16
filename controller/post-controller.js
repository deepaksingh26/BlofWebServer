import post from "../schema/post-schema.js";
import User from '../schema/user-schema.js';


export const CreatePost=async (req,res) => {
console.log(req.body);
try{
 const data=await new post(req.body);
 await data.save();
 res.status(200).json({message:"Blog saved sucessfully"});
}
catch(err)
{
    res.status(500).json({error:"error while sending post or error in post-controller.js"});
}
}
export const getAllPosts = async (req,res) => {
    try{
         let posts= await post.find({});
         console.log("pahunch gaye");
         res.status(200).json(posts);
    }catch(e){
        res.status(500).json(e);
    }
}
export const getPost = async (req,res)=>{
    
    try{
        console.log(req.params.id);
    let ele=await post.findById(req.params.id);
    res.status(200).json(ele);
    }
    catch(e)
    {
        res.status(500).json(e);
    }
}
export const getLog= async (req,res)=>{
    
    try{
    const email=req.body.email;
    const pass=req.body.pass;
   console.log(`${email} ans the password is ${password}`);
    }
    catch(e)
    {
        res.status(500).send("invalid credentials");
    }
}
export const getRegister= async(req,res)=>{
    console.log(req.body);
    const {fName,email,phone,pass,cpass}=req.body;
    console.log(req.body);

   if(!fName||!email||!phone||!pass||!cpass) 
   {  

       return res.status(404).json({error:"plz fill the field properly "});
   }
   try{
    const userEsist=await User.findOne({email:email})

    if(userEsist){
        return res.status(422).json({error:"Email Already Exist"});
    }
    else if(pass !=cpass)
    {
        return res.status(422).json({error:"please enter password carefully"});
    }
    else{
        
    const user =new User({fName,email,phone,pass,cpass});
        //sequreing paasword
        await user.save();
        res.status(201).json({message:"User registred sucessfully"});
       }
    }
    catch(err){console.log(err);}
}
////getuser
export const getUser= async(req,res)=>{
  console.log(req.body);
   try{const { email, pass } = req.body;
   if (!(email && pass))
   {
     res.status(400).send("All input is required");
   }
   //  Validate if user exist in our database
   console.log("Body",req.body);
   const userLongin = await User.findOne({ email });
   console.log("bhai idhar");
   console.log("id hai bhai",userLongin._id);  
   if(userLongin)
    {
        console.log(pass);
        console.log(userLongin.pass);
    const token=await userLongin.generateAuthToken();
    res.status(200).json(
        {
            token:token,
            id:userLongin._id
        }
        );
    }
    else
    {
        res.status(400).send("Invalid Credentials");
    }
    }
    catch(err)
    {
        console.log(err);
    }
}
// deleteUser
export const deleteUser= async (req,res)=>{
    
    try{
    const {id}=req.body;
   const response= await post.findByIdAndRemove(id);
    if(response)
    res.status(200).send("success")
    else
    res.status(500).send("unsuccessful")
    }
    catch(e)
    {
        console.log(`Cannot Delete`);
        res.status(500).send("Cannot Delete");
    }
}

//getname
export const getName= async (req,res)=>{
    try{
         console.log('hey',req.body.id);
         const name = await User.findById(req.body.id);
         console.log('name',name);
         const n =name.fName;
         res.status(200).json(
            {
               n
            });
    }
    catch(e){
      console.log('error',e);
    }
}
//inquery
export const getInquiry= async (req,res)=>{
    try{
         const name = await post.findById(req.body.id);
         console.log(name.username);
         const n =name.username;
         res.status(200).json(
            {
               n
            });
    }
    catch(e){
      console.log('error',e);
    }
}
    