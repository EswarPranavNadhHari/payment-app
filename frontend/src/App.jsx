import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from "./pages/Signup.jsx";
import { Signin } from "./pages/Signin";
import { SendMoney } from "./pages/SendMoney";
import { Dashboard } from "./pages/Dashboard";


function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
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
