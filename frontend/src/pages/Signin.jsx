
import { BottomWarning } from "../components/BottomWarning.jsx"
import { Button } from "../components/Button.jsx"
import { InputBox } from "../components/InputBox.jsx"
import { SubHeading } from "../components/SubHeading.jsx"
import { Heading } from "./../components/Heading.jsx"
import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import axios from "axios";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("Enter your credentials to access your account");
    const [color, setColor] = useState("text-slate-500");

    const navigate = useNavigate();
    return <div className="bg-grey h-dvh grid justify-center items-center">
        <div className="bg-white p-5 rounded-md w-80">
            <Heading label={"Sign in"}></Heading>
            <SubHeading text={warning} className={color} ></SubHeading>
            <InputBox onChange={(e)=>{
                setUsername(e.target.value);
            }} title={"Username"} placeHolder={"username"} type={"text"}></InputBox>
            <InputBox onChange={(e)=>{
                setPassword(e.target.value);
            }} title={"Password"} placeHolder={"xxxxxx"} type={"password"}></InputBox>
            <div className="pt-4">
                <Button onClick={async ()=>{
                    try {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                            username, password
                        })
                        
                        if(response.status == 200){
                            localStorage.setItem("token", response.data.token);
                            navigate('/Dashboard')
                        }
                        
                    } catch (error) {
                        setWarning(error.response.data.message);
                        setColor("text-red-600");
                    } 
                }} label={"Sign in"}/>
            </div>
            <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}></BottomWarning>
        </div>
        
    </div>
}