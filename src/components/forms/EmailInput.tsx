import { z } from 'zod';
import { useCallback, useMemo, useState } from 'react';
import { ValidatedInputValue, ValidatedStringInput } from './';
import { InputProps } from '@nextui-org/react';

type Props = {
    /** 必須フラグ */
    isRequired?: boolean;
    /** 無効化フラグ */
    isDisabled?: boolean;
    /** ラベル。指定したくない場合には空文字('')を指定 */
    label?: string;
    /** エラーメッセージ */
    errorMessage?: string;
    /** 。詳細はxxx参照 */
    classNames?: InputProps['classNames'];
    /** 値 */
    value: string;
    /** 値が変更された場合のコールバック関数  */
    onChange: (value: string) => void;
}

/** ｘｘｘｘｘｘｘｘ */
export const EmailInput = ({
    isRequired,
    isDisabled,
    label = 'メールアドレス',
    errorMessage = '不正なメールアドレスです',
    classNames,
    value,
    onChange
}: Props) => {
    const [inputValue, setInputValue] = useState<ValidatedInputValue<string>>({ value, invalid: !!isRequired && !value, message: '' });

    const schema = useMemo(() => {
        const schema = z.string().email(errorMessage);
        return isRequired ? schema : z.union([z.literal(''), schema]);
    }, [isRequired, errorMessage]);

    const handleChange = useCallback((inputValue: ValidatedInputValue<string>) => {
        setInputValue(inputValue);
        onChange(inputValue.value);
    }, [onChange]);

    return (
        <ValidatedStringInput
            type="email"
            name="email"
            classNames={classNames}
            isRequired={isRequired}
            isDisabled={isDisabled}
            label={label}
            inputValue={inputValue}
            schema={schema}
            onChange={handleChange}
        />
    )
}
