import { ReactNode } from 'react';

type Props = {
    value: ReactNode;
}

export const Label = ({ value }: Props) => {
    return (
        <div data-testid="label">
            {value}
        </div>
    )
}
