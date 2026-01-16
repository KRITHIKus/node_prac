import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css"

function debouncer(value, delay) {
  const [debval, setdebval] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setdebval(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debval;
}

export default function Test() {
  const [color, setColor] = useState("");
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [prod, setProd] = useState([]);

  const debtext = debouncer(text, 1000);
  let RandomColor = () => {
    let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return color;
  };

  let counter = () => {
    setTimeout(() => {
      setColor(RandomColor());
      setCount((p) => p + 3);
    }, 500);
  };

  useEffect(() => {
    if (debtext === "") return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://dummyjson.com/users/search?q=${debtext}`
        );

        if (res.data && res.data.users) {
          setProd(res.data.users);
        } else {
          setProd([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(error);
      }
    };

    fetchData();
  }, [debtext]);

  return (
    <>
      <p>{count}</p>
      <button className="btn hovers" onClick={counter}>Counter</button>
      <div style={{ height: "200px", width: "200px", background: color }}></div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search users by name"
      />
       
      {prod.length > 0 ? (
        <ul>
          {prod.map((user) => (
            <li key={user.id}>
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </>
  );
}
