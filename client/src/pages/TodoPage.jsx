import React, { useState } from "react";

export default function TodoPage() {
  let [text, settext] = useState("");
  let [todo, settodo] = useState([]);
  let [editId, seteditId] = useState(null);

  
  let submitHandler = () => {
    if (!text.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };
    if (editId !== null) {
      settodo(
        todo.map((t) => (t.id === editId ? { ...t, text: text.trim() } : t)),
      );
      seteditId(null);
      settext("");
    } else {
      settodo([...todo, newTodo]);
      settext("");
    }
  };

  let updateHandler = (id) => {
    let todoEdit = todo.find((t) => t.id === id);
    if (todoEdit) {
      seteditId(id);
      settext(todoEdit.text);
    }
  };

  let cancel = () => {
    seteditId(null);
    settext("");
  };
  let deleteHandler = (id) => {
    settodo(todo.filter((t) => id !== t.id));
  };

  let completedHandle = (id) => {
    settodo(
      todo.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };
  return (
    <>
      <h1>Todo App</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => settext(e.target.value)}
      ></input>
      <button onClick={submitHandler}>submit</button>
      {editId && <button onClick={cancel}>cancel</button>}
      {todo.map((t) => (
        <ul key={t.id}>
          <li>
            <span
              style={{ textDecoration: t.completed ? "line-through" : "none" }}
            >
              {t.text}
            </span>
            <button
              className="btn btn-sm "
              onClick={() => {
                completedHandle(t.id);
              }}
              style={{
                border: t.completed ? "2px solid green" : "2px solid red",
              }}
            >
              {t.completed ? "👍" : "❌"}
            </button>{" "}
            <button onClick={() => updateHandler(t.id)}>update</button>{" "}
            <button onClick={() => deleteHandler(t.id)}>delete</button>
          </li>
        </ul>
      ))}
    </>
  );
}
