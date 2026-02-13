import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
  import useLogout from "../components/logout";
  import { setusers } from "../redux/slice";
  import {useDispatch} from 'react-redux'
  import { useSelector } from "react-redux";
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [edit, setedit] = useState(null);
  const [updatedata, setupdatedata] = useState({});
  const [currentuser, setcurrentuser] = useState(null);
  const user=useSelector(state=>state.user.currentuser)
  const logout = useLogout();
  const navigate = useNavigate();
const dispatch=useDispatch()
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (user?.role !== "admin") {
          navigate("/userPage");
        }
        setcurrentuser(user);

        const response = await axios.get("http://localhost:5000/api/users", {
          withCredentials: true,
        });
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  const Handeldelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setUsers((prev) => prev.filter((user) => user._id !== id));
        alert("user deleted sucessfully");
      }
    } catch (error) {
      setError(navigate(error));
    }
  };

  const handleSubmit = async (id, updatedata) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${id}`,

        updatedata,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUsers((prev) =>
          prev.map((user) =>(
            user._id === id ? { ...user, ...updatedata } : user)
          )
        );
        alert("updated sucessfully");
        setedit(null);
      }
    } catch (error) {
      setError(error);
    }
  };
  const editChange = (e) => {
    setupdatedata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleEdit = (user) => {
    setupdatedata({
      name: user.name,
      email: user.email,
    });
    setedit(user._id);
  };
  const handleCancel = () => {
    setedit(null);
    setupdatedata({});
  };

const editCurrentUser=()=>{
  setupdatedata({
    name:currentuser.name,
    email:currentuser.email
  })
  setedit(currentuser._id)
}

  const handleUpdateCurrentUser= async()=>{
    try {
      const response= await axios.patch(`http://localhost:5000/api/users/${currentuser._id}`,updatedata,
        {withCredentials:true}
      )
      if(response.status===200){
         dispatch(setusers({
    ...user,
    ...updatedata
  }))
        setcurrentuser((prev)=>({...prev,...updatedata}))
        alert("done")
        setedit(null)
      }
    } catch (error) {
      setError("failed to update ")
    }
  }

  const { name, email, role, _id } = currentuser || {};

  const filteredUser= users.filter((user)=>user._id !== _id)
  return (
    <>
      <button onClick={logout}>Logout</button>
      <div>
        <h1>Admin Dashboard</h1>
        <h2>All Users</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredUser.map((user) => (
              <tr key={user._id}>
                <td>
                  {edit === user._id  ? (
                    <input
                      type="text"
                      name="name"
                      value={updatedata.name || ""}
                      onChange={editChange}
                      className="form-control"
                     
                    ></input>
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {edit === user._id ? (
                    <input
                      type="email"
                      name="email"
                      value={updatedata.email || ""}
                      onChange={editChange}
                      className="form-control"
                    ></input>
                  ) : (
                    user.email
                  )}
                </td>
                <td>{user.role}</td>
                <td>
                  {edit === user._id ? (
                    <div>
                      <button
                        className="btn btn-sucess"
                        onClick={() => handleSubmit(user._id, updatedata)}
                      >
                        save
                      </button>
                      <button className="btn btn-danger" onClick={handleCancel}>
                        cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning me-3"
                        onClick={() => handleEdit(user)}
                      >
                        update{" "}
                      </button>
                      <button
                        className="btn btn-danger me-3"
                        onClick={() => Handeldelete(user._id)}
                      >
                        delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="">
        <div className="card mb-5 mt-5">
          <div className="card-header">
            <h1>Edit current user</h1>
          </div>
          <div className="card-body">
            {edit === _id ? (
              <>
                
                <input
                  type="text"
                  placeholder="enter name"
                  name="name"
                  value={updatedata.name||""}
                  onChange={editChange}
                ></input>
                <input
                  type="email"
                  name="email"
                  placeholder="enter name"
                  value={ updatedata.email||""}
                  onChange={editChange}
                ></input>
               
                <button
                  onClick={handleUpdateCurrentUser}
                >
                  save
                </button>
                <button onClick={handleCancel}>cancel</button>
              </>
            ) : (
              <>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Role: {role}</p>
              </>
            )}
            <button onClick={editCurrentUser}> update</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
