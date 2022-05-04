import express  from "express";
import {CreatePost,getAllPosts, getPost,getLog,getRegister,getUser} from '../controller/post-controller.js'
const router=express.Router();


router.post('/create',CreatePost);
router.get('/posts',getAllPosts);
router.get(`/post/:id`,getPost);
// router.post(`/login`,getUser);
router.post(`/register`,getRegister);
router.post(`/getuser`,getUser);

export default router;