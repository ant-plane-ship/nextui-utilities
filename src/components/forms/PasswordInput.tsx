import { useCallback, useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { z } from 'zod';

import { ValidatedStringInput, ValidatedInputValue } from '.';


const PASSWORD_SCHEMA = z.string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_+\-*/=#$%&@:;?])[a-zA-Z0-9_+\-*/=#$%&@:;?]{8,}$/,
    { message: '全体で8文字以上、英小文字/英大文字/数字/記号(_+-*/=#$%&@:;)を1文字以上含む必要があります' }
);


type Props = {
    inputValue: ValidatedInputValue<string>;
    isValidated?: boolean;
    onChange: (inputValue: ValidatedInputValue<string>) => void;
}

export const PasswordInput = ({ inputValue, isValidated, onChange }: Props) => {
    const [isVisibility, setIsVisibility] = useState(false);

    const handleIconClick = useCallback(() => {
        setIsVisibility(!isVisibility);
    }, [isVisibility]);

    return (
        <ValidatedStringInput
            data-testid="password-input"
            type={isVisibility ? 'text' : 'password'}
            label="パスワード"
            isRequired
            inputValue={inputValue}
            schema={isValidated ? PASSWORD_SCHEMA : undefined}
            endContent={
                isVisibility ?
                    <MdVisibilityOff data-testid="visivility-off-icon" onClick={handleIconClick} /> :
                    <MdVisibility data-testid="visibility-icon" onClick={handleIconClick} />
            }
            onChange={onChange}
        />
    )
}
