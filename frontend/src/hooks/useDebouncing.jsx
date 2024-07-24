import { useEffect, useState } from "react";
import axios from "axios";

export function useDebouncing(link) {
    const token = localStorage.getItem("token");
    const [data, setData] = useState([])
    useEffect(()=>{
        const value = setTimeout(() => {
          const fetchUsers = async () => {
              try {
                const response = await axios.get(`${link}`, {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                });
                setData(response.data.users); // Set the response data to state
              } catch (error) {
                console.error('Error fetching data:', error);
              }
          };
          fetchUsers();
        }, 300);
  
        return()=>{
          clearTimeout(value)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[link]);

    return data
}