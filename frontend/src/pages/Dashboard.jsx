import { useEffect, useState } from "react"
import { AppBar } from "../components/AppBar"
import { Button } from "../components/Button"
import { InputBox } from "../components/InputBox"
import { User } from "../components/User"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDebouncing } from "../hooks/useDebouncing"

export const Dashboard = () => {
    const [balance, setBalance] = useState("")
    const token = localStorage.getItem("token");
    const [search, setSearch] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              setBalance(response.data.balance); 
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        };

        const fetchName = async () => {
            try {
              const response = await axios.get("http://localhost:3000/api/v1/user/details", {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              setName(response.data.firstName); 
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        };


        fetchData();
        fetchName();
    },[token]);

    const users = useDebouncing(`http://localhost:3000/api/v1/user/bulk?filter=${search}`);

    return <div className="">
        <AppBar name={name}></AppBar>
        <div className="px-5 py-5" >
            <div className="font-bold text-2xl">{`Your Balance ₹${balance}`}</div>
            <InputBox onChange={(e)=>{
                setSearch(e.target.value);
            }} className="font-bold text-2xl py-5" title="Users" type="text" placeHolder="search users"></InputBox>
            <div className="pt-5">
                {users.map((user, index)=>{
                    return <div key={index} className="flex justify-between py-2 items-center">
                        <User name={user.firstName}></User>
                        <Button onClick={()=>{
                            navigate("/SendMoney", {
                                state: user
                            });
                        }} className="w-fit" label={"Send Money"}></Button>
                    </div>
                })}
            </div>
        </div>
    </div>
}