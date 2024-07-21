/* eslint-disable react/prop-types */
import { twMerge } from "tailwind-merge";

export const SubHeading = ({text, className}) => {
    return <div className={twMerge(`text-md pt-2 pb-4 px-4 text-center text-slate-500 ${className ?? ""}`)}>
        {text}
    </div>
}