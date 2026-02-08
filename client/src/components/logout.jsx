import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout as logoutAction } from "../redux/slice";
import { useDispatch } from "react-redux";
 const useLogout=()=>{
    const navigate= useNavigate()
const dispatch=useDispatch()
    const logout=async()=>{
        try {
            await axios.post("http://localhost:5000/api/users/logout",
                {},
                {withCredentials:true}
            )
            // localStorage.removeItem("user")
            dispatch(logoutAction())
            navigate("/")
        } catch (error) {
            console.log(error)
           alert("logout failed") 
        }
    }
    return logout
}

export default useLogout;