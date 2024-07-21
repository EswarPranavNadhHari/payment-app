import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning.jsx"
import { Button } from "../components/Button.jsx"
import { InputBox } from "../components/InputBox.jsx"
import { SubHeading } from "../components/SubHeading.jsx"
import { Heading } from "./../components/Heading.jsx"
import axios from "axios";
import {useNavigate} from 'react-router-dom'


export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("Enter your information to create an account");
    const [color, setColor] = useState("text-slate-500")

    const navigate = useNavigate();

    return <div className="bg-grey h-dvh grid justify-center items-center">
        <div className=" bg-white p-5 rounded-md w-80">
            <Heading label={"Sign Up"}></Heading>
            <SubHeading text={warning} className={color} ></SubHeading>
            <InputBox onChange={(e)=>{
                setUserName(e.target.value);
            }} title={"User Name"} placeHolder={"john@doe"} type={"text"}></InputBox>
            <InputBox onChange={(e)=>{
                setFirstName(e.target.value);
            }} title={"First Name"} placeHolder={"John"} type={"text"}></InputBox>
            <InputBox onChange={(e)=>{
                setLastName(e.target.value);
            }} title={"Last Name"} placeHolder={"Doe"} type={"text"}></InputBox>
            <InputBox onChange={(e)=>{
                setPassword(e.target.value);
            }} title={"Password"} placeHolder={"xxxxxx"} type={"password"}></InputBox>
            <div className="pt-4">
                <Button onClick={async ()=>{
                    try {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username: userName,password,firstName,lastName
                        })
                        
                        if(response.status == 200){
                            localStorage.setItem("token", response.data.token);
                            navigate('/Dashboard')
                        }
                        
                    } catch (error) {
                        setWarning(error.response.data.message);
                        setColor("text-red-600");
                    }
                    
                }} label={"Sign up"}/>
            </div>
            <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}></BottomWarning>
        </div>
        
    </div>
}