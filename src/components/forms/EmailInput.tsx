import { z } from 'zod';
import { useMemo } from 'react';
import { ValidatedInputValue, ValidatedStringInput } from './';

type Props = {
    isRequired?: boolean;
    isDisabled?: boolean;
    label?: string;
    errorMessage?: string;
    inputValue: ValidatedInputValue<string>;
    onChange: (inputValue: ValidatedInputValue<string>) => void;
}

export const EmailInput = ({ isRequired, isDisabled, label, errorMessage, inputValue, onChange }: Props) => {

    const schema = useMemo(() => {
        return z.string().email(errorMessage ? errorMessage : '不正なメールアドレスです');
    }, [errorMessage]);

    return (
        <ValidatedStringInput
            testid="email-input"
            type="email"
            name="email"
            isRequired={isRequired}
            isDisabled={isDisabled}
            label={label ? label : 'メールアドレス'}
            inputValue={inputValue}
            schema={schema}
            onChange={onChange}
        />
    )
}
