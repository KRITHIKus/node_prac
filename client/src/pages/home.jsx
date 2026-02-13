import React, { useState } from 'react'
import useLogout from '../components/logout'
import usePasschange from '../components/passchange'
import { setusers } from '../redux/slice'
import { useSelector } from 'react-redux'



export default  function Userpage() {
//const userInfo=JSON.parse(localStorage.getItem("user"))
const userInfo=useSelector((state)=>state.user.currentuser)

  const logout=useLogout()

  const {passwordUpdate,err}=usePasschange()

const [password,setpassword]=useState("")
const [newPassword,setnewPassword]=useState("")
 const [error, setError] = useState("")

 const handleUpdatePassword=async()=>{
  try {
      const id = userInfo._id
  const res = await passwordUpdate(id,password,newPassword)
   if (res) {
            alert("Password updated successfully")
            setpassword("")
            setnewPassword("")
             setError("") 
        } else {
            setError("Error updating password. Please check your old password.")
           setpassword("")
            setnewPassword("")
        }
  } catch (error) {
    console.log(error)
  }

 }
  return (
    <>
    <h1>Hello {userInfo.name}</h1>
    <h4>Email: {userInfo.email}</h4>
    <h4>Role: {userInfo.role}</h4>
    

 <div>
                <h3>Change Password</h3>
                <input 
                    type="password" 
                    placeholder="Enter old password" 
                    value={password} 
                    onChange={(e) => setpassword(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Enter new password" 
                    value={newPassword} 
                    onChange={(e) => setnewPassword(e.target.value)} 
                />
                <button onClick={handleUpdatePassword}>Update Password</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
    <button className='btn hovers' onClick={logout}>logout</button>
    </>
  )
}
