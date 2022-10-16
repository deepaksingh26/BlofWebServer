import express  from "express";
import {CreatePost,getAllPosts, getPost,getLog,getRegister,getUser,deleteUser,getName,getInquiry} from '../controller/post-controller.js';
const router=express.Router();

router.post('/create',CreatePost);
router.get('/posts',getAllPosts);
router.get(`/post/:id`,getPost);
router.post(`/delete`,deleteUser);
router.post(`/register`,getRegister);
router.post(`/getuser`,getUser);
router.post(`/name`,getName);
router.post(`/inquiry`,getInquiry);
export default router;