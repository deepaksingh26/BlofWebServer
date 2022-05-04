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
export const getUser= async(req,res)=>{
  console.log(req.body);
   try{const { email, pass } = req.body;
   if (!(email && pass))
   {
     res.status(400).send("All input is required");
   }
   // Validate if user exist in our database
   const userLongin = await User.findOne({ email });
   console.log("bhai idhar");
   console.log(userLongin);  
   if(userLongin)
    {
        console.log(pass);
        console.log(userLongin.pass);
    const token=await userLongin.generateAuthToken();
    res.json(token);
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
//  if (user && (await bcrypt.compare(pass, User.pass))) {
//      const token = jwt.sign(
//        { user_id: user._id, email },
//        process.env.TOKEN_KEY,
//        {
//          expiresIn: "2h",
//        }
//      );

//      user.token = token;

//      res.status(200).json(user);
//    }


    // const {email,pass}=req.body;
    // if(!email||!pass)
    // {   
    //     return res.status(400).json({error:"fill the field properly"});
    // }
    // const userLongin=await User.findOne({email:email});
    // if(userLongin)
    // {
    // const isMatch=await bcrypt.compare(pass,userLongin.pass);
    // token=await userLongin.generateAuthToken();
    // res.cookie("jwt",token,
    // {
    //     expires:new Date(Date.now()+258920000),
    //     httpOnly:true,
    // });
    // if(!isMatch)
    // {
    //     res.status(400).json({error:"Invalid Credentials "});
    // }
    // else
    // {
    //     res.json({message:"user Singnedin Successfully"});
    // }
    // }
    // else
    // {
    //     res.status(400).json({error:"Invalid Credentials"});
    // }