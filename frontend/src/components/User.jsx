/* eslint-disable react/prop-types */
import { twMerge } from "tailwind-merge"

export const User = ({name, className}) => {
    return <div className="flex gap-3">
        <div className={twMerge(`grid rounded-full bg-user h-10 w-10 text-center font-medium text-xl items-center text-gray-800 content-center ${className??""}`)}>{name.split(" ").length > 1 ? name.split(" ")[0].slice(0,1)+name.split(" ")[1].slice(0,1) : name.split(" ")[0].slice(0,1)}</div>
        <div className="font-medium text-2xl content-center">{name}</div>
    </div>
}