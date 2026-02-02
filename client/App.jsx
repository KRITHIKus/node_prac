import { BrowserRouter as Router,Route,Routes, Link } from "react-router-dom"

import Login from './src/components/login'
import Signup from './src/components/signup'
import { useNavigate } from "react-router-dom"
import Dashboard from "./src/pages/Dashboard"
import ErrorPage from "./src/components/error"
import Userpage from "./src/pages/home"
import Test from "./src/pages/test"
import FileHandle from "./src/pages/fileH"

export default function App(){

  return(
    <Router>
      <Routes>
        <Route path="/" element={<div>home 
          <Link className="btn btn-primary" to="/signup">signup</Link>
          <Link className="btn btn-warning" to="/login">login</Link>
        </div>}></Route>
        <Route path="/userPage" element={<Userpage/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/dash" element={<Dashboard/>}></Route>
        <Route path='/error' element={<ErrorPage/>}></Route>
        <Route path="/task" element={<Test/>}></Route>
        <Route path="/file" element={<FileHandle/>}></Route>
      </Routes>
    </Router>
  )
}

