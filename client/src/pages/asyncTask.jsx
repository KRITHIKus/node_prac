import axios from "axios";
import React, { use, useEffect, useState } from "react";

export default function AsyncTask() {
  let [users, setusers] = useState([]);
  let [posts, setposts] = useState([]);
  let [error, seterror] = useState({
    api_error: "",
  });
  let [page,setpage]=useState(0);
  let limit=5;

  let fetchUserData = async (pageno) => {
    try {
        const skip=pageno*limit

      let resUser = await axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
      let resPost = await axios.get("https://dummyjson.com/posts");

      if (!resPost && !resUser) {
        seterror((error.api_error = `no data `));
      } else {
        setposts(resPost.data.posts);
        setusers(resUser.data.users.slice(0,5));
      }
    } catch (error) {
      console.log("error", error);
    }
  };
useEffect(()=>{
fetchUserData(page)
},[page])
  return (
    <>
      <h1> Users</h1>

      <h3>click button for data</h3>

     
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>User Gender</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.firstName}</td>
              <td>{u.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
       <button onClick={()=>setpage(page-1)} disabled={page===0}>back</button>
       <button onClick={()=>setpage(page+1)} disabled={page===5}>next</button>
    </>
  );
}
