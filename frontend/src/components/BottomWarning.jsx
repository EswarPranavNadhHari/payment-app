/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

export function BottomWarning({label, buttonText, to}) {
    return <div className="py-2 font-semibold text-sm flex justify-center">
      <div>
        {label}
      </div>
      <Link className="pointer font-semibold underline pl-1 cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
}