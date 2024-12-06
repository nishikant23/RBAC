export const Button = ({btnLabel, onClick} : {btnLabel: string, onClick:  () => Promise<void>}):JSX.Element => {
    return <div>
        <button onClick={onClick} className=" w-full text-white bg-black hover:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 transition hover:duration-300 hover:scale-105 ease-in-out hover:delay-100">
            {btnLabel}
        </button>
    </div>
}