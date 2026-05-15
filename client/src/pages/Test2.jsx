import React, { useEffect, useState } from "react";

let Users = [
  { id: 1, name: "jack", age: 12 },
  { id: 2, name: "bob", age: 21 },
  { id: 3, name: "rachel", age: 32 },
  { id: 4, name: "roe", age: 33 },
];

export default function Test2() {
  let [input, setinput] = useState("");
  let [message, setmessage] = useState("");
  let [active,setactive]=useState(null)

  let selectChange = (e) => {
    setinput(e.target.value);
  };

  let userSearch =input.trim()===""? []: Users.filter((u) =>    u.name.toLowerCase().includes(input.toLowerCase()),
  );

let count = userSearch.length


  return (
    <>
      <h1> Users</h1>

      <input type="text" value={input} onChange={selectChange}></input>
      <p>users count: {count}</p>
      {userSearch.map((u) => (
        <ul key={u.id} style={{color:u.id===active ? "red" : "black", cursor:"pointer"}} onClick={()=>setactive(active ===u.id ? null :u.id)}>
          <li>Name: {u.name}</li>
          <li>AGE: {u.age}</li>
        </ul>
      ))}
      {count===0 && <p>no users found</p>}
    </>










  );
}
