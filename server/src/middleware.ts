import { NextFunction, Request, Response } from "express"
import axios from "axios"
import { unsetValue ,setValue} from "node-global-storage"
const VerifyPayment = async (req:Request, res:Response, next:NextFunction) => {
unsetValue("id_token")
try {
   const {data}:any =await axios.post(process.env.bkash_grant_token_url!,{
    "app_key": process.env.bkash_api_key,
    "app_secret": process.env.bkash_secret_key
   },{
    headers:{
    "Content-Type": "application/json",
    "Accept": "application/json",
    username:process.env.bkash_username,
    password:process.env.bkash_password
    }
   })

   setValue("id_token",data.id_token,{protected:true})
   next()
} catch (error:any) {
    // console.log(error?.response?.data)
    res.status(401).json({error:error.message})
    
}
    
} 

export default VerifyPayment