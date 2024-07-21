/* eslint-disable react/prop-types */
import { twMerge } from "tailwind-merge"

export const AppBar = ({name, className}) => {
    return <div className="flex justify-between border-b-2 py-5 px-5">
        <div className=" text-3xl content-center md:text-4xl font-bold">{"Payments App"}</div>
        <div className="flex gap-4">
            
            <div className="font-medium text-2xl content-center">{"Hello, "+name.split(" ")[0]}</div>
            <div className={twMerge(`grid rounded-full bg-user h-10 w-10 text-center font-medium text-xl items-center text-gray-800 content-center ${className??""}`)}>{name.split(" ").length > 1 ? name.split(" ")[0].slice(0,1)+name.split(" ")[1].slice(0,1) : name.split(" ")[0].slice(0,1)}</div>
        </div>
    </div>
}