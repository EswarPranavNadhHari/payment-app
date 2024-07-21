import { useState } from "react"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { User } from "../components/User"
import { useLocation } from 'react-router-dom';
import axios from "axios";

export const SendMoney = () => {
    const location = useLocation();
    // const id = location.id;
    // const firstName = location.firstName;
    const token = localStorage.getItem("token");
    const [amount, setAmount] = useState("");
    const [warning, setWarning] = useState("");
    const [color, setColor] = useState("text-slate-500");
    const id = location.state._id;
    const firstName = location.state.firstName;

    return <div className="grid justify-center items-center bg-grey h-dvh">
        <div className="bg-white p-5 rounded-md w-80">
            <Heading label={"Send Money"}></Heading>
            <SubHeading text={warning} className={color} ></SubHeading>
            <User name={firstName}></User>
            <InputBox onChange={(e)=>{
                setAmount(e.target.value);
            }} title={"Amount (in Rs)"} type={"text"} placeHolder={"Enter amount"}></InputBox>
            <div className="pt-4">
            <Button onClick={async ()=>{
                    try {
                        const response = await axios.post("http://localhost:3000/api/v1/account/transfer",{
                            to: id, amount
                        },{
                            headers: {
                                Authorization: "Bearer "+token
                            }
                        })
                        setWarning(response.data.message);
                        setColor("text-green-600")
                    } catch (error) {
                        setWarning(error.response.data.message);
                        setColor("text-red-600");
                    } 
                }} label={"Initiate Transfer"}></Button>
            </div>
        </div>
    </div>
}