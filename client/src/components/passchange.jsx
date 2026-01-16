import axios from 'axios'
import React, { useState } from 'react'

export default function usePasschange() {
    const[err,seterr]=useState("")
  
      let passwordUpdate=async(id,password,newPassword)=>{
        try {
let res=await axios.patch(`http://localhost:5000/api/users/passwordchange/${id}`,{password,newPassword}, {withCredentials:true})
if(res.status===200){
    return true
}
return false
    
  } catch (error) {
    console.log(error)
    seterr("Could not update password:",err)
    return false

  }
}
 return {passwordUpdate,err}

}
