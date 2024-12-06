export const Heading = ({label}:{label: string}): JSX.Element => {
    return <div className="text-4xl font-bold pt-4">
        {label}
    </div>
}