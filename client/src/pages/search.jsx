import axios from "axios";
import {  useEffect, useState } from "react";

function useDebounce(text,delay){
    let [debval,setdebval]=useState(text);

    useEffect(()=>{
        const handler=setTimeout(()=>{
            setdebval(text)
        },delay);
        return ()=>{
            clearTimeout(handler);
        };
    },[text,delay])
    return debval
}

export default function Search(){

let [text,settext]=useState("")
let [data,setdata]=useState([])
let [error,seterror]=useState("")
let debText=useDebounce(text,1000)

useEffect(()=>{
    if(!debText)return;
   async function getDatas() {
    try {
         let res=await axios.get(`http://localhost:5000/api/users?filter=name&&value=${debText}`,{withCredentials:true})
         setdata(res.data)
    } catch (error) {
        seterror(error.message)
    }
   }
   getDatas()
},[debText])

const searchHandler=(e)=>{
    settext(e.target.value)
}

return(<>

<input type="text" onChange={searchHandler}></input>
<table>
    <thead>
        <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        </tr>
    </thead>
    <tbody>
        {data.map((user)=>(
            <tr key={user._id}>
                <td>
                    {user.name}
                </td>
                <td>
                    {user.email}
                </td>
                <td>
                    {user.role}
                </td>
            </tr>
        ))}
    </tbody>
</table>
</>)

}