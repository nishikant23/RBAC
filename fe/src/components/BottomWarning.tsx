import { To } from "react-router-dom"

interface BottomWarningProps {
    label: string, 
    btmWarLabel: string, 
    to: To,
}

export const BottomWarning = ({label, btmWarLabel, to} : BottomWarningProps) => {

    return <div className="flex justify-center px-1 py-2">
        <div className="text-sm text-gray-500">
            {label}
        </div>
        <a className="pointer underline cursor-pointer text-gray-500 pl-1 text-sky-600" 
        href={typeof to === "string" ? to : undefined }>{btmWarLabel}</a>
        {/* <Link className="pointer underline cursor-pointer text-gray-500 pl-1" to={to}>{btmWarLabel}</Link> */}
    </div>
}