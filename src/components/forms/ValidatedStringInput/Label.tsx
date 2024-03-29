import { ReactNode } from 'react';

type Props = {
    value: ReactNode;
}

export const Label = ({ value }: Props) => {
    return (
        <span data-testid="label">
            {value}
        </span>
    )
}
