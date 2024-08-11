import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Signup } from "./pages/Signup.jsx";
import { Signin } from "./pages/Signin";
import { SendMoney } from "./pages/SendMoney";
import { Dashboard } from "./pages/Dashboard";


function App() {

  const loggedIn = localStorage.getItem("token");

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={loggedIn ? "/Dashboard" : "/Signup"} />}></Route>
            <Route path="/Signup" element={<Signup/>}></Route>
            <Route path="/Signin" element={<Signin/>}></Route>
            <Route path="/Dashboard" element={<Dashboard/>}></Route>
            <Route path="/SendMoney" element={<SendMoney/>}></Route>
          </Routes>
        </BrowserRouter>


    </div>
  )
}

export default App
