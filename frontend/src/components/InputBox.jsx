/* eslint-disable react/prop-types */
import { twMerge } from "tailwind-merge";

export const InputBox = ({title, type, placeHolder, className, onChange}) => {
    return <div className="py-1">
        <div className={twMerge(`text-sm font-medium text-left py-2 ${className??""}`)}>
            <label htmlFor={title}>{title}</label>
        </div>
        <input onChange={onChange} className="w-full px-2 py-1 border rounded border-slate-200" type={type} name={title} id={title} placeholder={placeHolder}/>
    </div>
}