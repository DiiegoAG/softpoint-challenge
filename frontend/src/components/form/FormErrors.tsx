interface Props {
    error: string | null
}

const FormErrors = ({ error }: Props) => {
    if (!error) return null

    return (
        <p className="text-red-500 pt-2">
            {error}
        </p>
    )
}

export default FormErrors

