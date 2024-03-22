type Props = {
    value: string;
}

export const Message = ({ value }: Props) => {
    return (
        <div data-testid="message">
            {value}
        </div>
    )
}
