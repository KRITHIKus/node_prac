import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { setusers } from "../redux/slice"
import { useDispatch } from "react-redux"




const Login=()=> {
  const [email,setemail]=useState("")
  const dispatch=useDispatch()
  const [password,setpassword]=useState("")
  const [error,seterror]=useState("")

 const navigate = useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault();
    seterror("");
    try {
      const response =await axios.post("http://localhost:5000/api/users/login",{email,password},{withCredentials:true})
      alert("login successfull") 
      const {userDetails}= response.data
     
     dispatch(setusers(userDetails))
     console.log(userDetails.role)
      if(userDetails.role==="admin"){
        navigate("/dash")
      }else{
        navigate("/userPage")
      }
    
    } catch (error) {
    seterror(error.response.data.msg || "something went wrong")  
    }
  }
  return (
    <>
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>

        <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} required placeholder="enter email"></input>
        <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} required placeholder="enter password"></input>
     
     <button className="btn btn-warning" type="submit">Login</button>
     
      </form>
      <p>Don't have account <Link to="/signup">Sign up</Link></p>
    </div>
  
    </>
  )
}
export default Login