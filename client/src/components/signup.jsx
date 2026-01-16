
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"




const Signup = () => {


const [name,setname]=useState("")
const [email,setemail]=useState("")
const [password,setpassword]=useState("")
const [error,seterror]=useState("")
const [cpass,setcpass]=useState("")
  const [passwordMatchError, setPasswordMatchError] = useState(""); // State for password match error



const navigate = useNavigate()

const isvalidemail=(email)=>{
  const regex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(email)
}
const isvalidpassword=(password)=>{
  const regex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/
   return regex.test(password)
}
const handleSubmit=async(e)=>{
  e.preventDefault()
  seterror("")
  if(!isvalidemail(email)){
    seterror("please enter valid email")
    return
  }
  if(!isvalidpassword(password)){
    seterror("please enter valid password")
    return
  }
  if(password !== cpass){
    seterror("passwords do not match")
    return
  }
  try {
    const response= await axios.post("http://localhost:5000/api/users",{name,email,password})
    alert("User Created successfully")
    navigate("/login") 
  } catch (err) {
   seterror(err.response.data.msg || "somethig went wrong") 
  }
}

const validpass= (e)=>{
  const newPassword=e.target.value
  setcpass(newPassword)

  if(password!== newPassword){
     setPasswordMatchError("Passwords do not match");
  }else{
    setPasswordMatchError("")
  }

}

  return (
  
  <>
<div className="container mt-5">
  <h1>Signup</h1>
{ error && <div className="alert alert-danger">
  {error}
  </div>}
<div className="mb-3">
  <form onSubmit={handleSubmit}>
<div>
 <input type="text" placeholder="enter user name"
    onChange={(e)=>setname(e.target.value)}
    className="form-control"
    value={name}
    required
    ></input>
    <input type="email " placeholder="enter user email"
    onChange={(e)=>setemail(e.target.value)}
    className="form-control"
    value={email}
    required
    ></input>
    
    <div className="mb-3">
      <label className="form-label">password:</label>
      <input type="password" placeholder="enter user password"
    onChange={(e)=>setpassword(e.target.value)}
    className="form-control"
    value={password}
    required
    ></input>
    <small>                    Password must be at least 8 characters long, include a number, an uppercase letter, and a special character.
</small>
    </div>
    <div className="mb-3">
      <label className="form-label">password:</label>
      <input type="password" placeholder="confirm your password"
    onChange={validpass}
    className="form-control"
    value={cpass}
    required
    />{passwordMatchError && (<div className="alert alert-danger mt-2">{passwordMatchError}</div>)}
    </div>
</div>
   
    <button type="submit">Signup</button>
  </form>
</div>
</div>
  </>

  )
}

export default Signup
