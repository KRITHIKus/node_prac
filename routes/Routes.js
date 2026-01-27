import express from "express"
import { ById, createUser,deleteUser,downl,getusers,  PrimeNUM, read, updateUser} from "../controllers/UserController.js"
import { findUserByID } from "../middleware/FindID.js"
import { login, signup,logout, passwordUpdate } from "../controllers/UserCredentials.js"
import { userValidation,validateReq } from "../validator_middleware/Schema_validators.js"
import { isAuthenticated } from "../middleware/authMiddleware.js"
import {readFile, writefile } from "../middleware/simple.js"

const Router=express.Router()


Router.get('/read',readFile,read)
Router.post('/write',writefile)


//public route
Router.post('/login',login)
Router.post('/',userValidation,validateReq,signup,)
Router.post('/logout',isAuthenticated,logout)
Router.post('/prime',PrimeNUM)
Router.get('/down',downl)
//protected routes

Router.use(isAuthenticated)
Router.get('/',getusers)
Router.get('/:id',findUserByID,ById)
Router.delete('/:id', findUserByID,deleteUser)
Router.patch('/:id',findUserByID,updateUser)
Router.put('/:id',findUserByID,updateUser)
Router.patch('/passwordchange/:id',findUserByID,passwordUpdate)


export default Router