import axios from "axios";
import { useNavigate } from "react-router-dom";

 const useLogout=()=>{
    const navigate= useNavigate()

    const logout=async()=>{
        try {
            await axios.post("http://localhost:5000/api/users/logout",
                {},
                {withCredentials:true}
            )
            localStorage.removeItem("user")
            navigate("/")
        } catch (error) {
            console.log(error)
           alert("logout failed") 
        }
    }
    return logout
}

export default useLogout;