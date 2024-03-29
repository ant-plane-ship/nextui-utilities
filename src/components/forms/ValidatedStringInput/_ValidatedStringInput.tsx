import { FocusEvent, useCallback } from 'react';
import { Input, InputProps } from '@nextui-org/input';
import { ZodLiteral, ZodString, ZodUnion, z } from 'zod';
import { ValidatedInputValue, createInitialValidatedInputValue } from '../_utils/ValidatedInputValue';
import { Message } from './Message';
import { Label } from './Label';

type Props = Omit<InputProps, 'label' | 'value' | 'errorMessage' | 'isInvalid' | 'validationState' | 'onChange' | 'onValueChange'> & {
    label?: string;
    /** テスト */
    inputValue: ValidatedInputValue<string>;
    schema?: ZodString | ZodUnion<[ZodLiteral<string>, ZodString]>;
    onChange: (inputValue: ValidatedInputValue<string>) => void;
}

/**
 * NextUIの<a href="https://nextui.org/docs/components/input" target="_blank">Inputコンポーネント</a>
 */
export const ValidatedStringInput = ({ label, inputValue, schema = z.string(), onChange, onBlur, ...props }: Props) => {

    const handleChange = useCallback((text: string) => {
        onChange(createInitialValidatedInputValue(text));
    }, [onChange]);

    const handleBlur = useCallback(async (event: FocusEvent) => {
        const newInputValue = { value: inputValue.value, invalid: false, message: '' };
        const result = await schema.safeParseAsync(inputValue.value);
        newInputValue.invalid = !result.success;
        if (!result.success) {
            newInputValue.message = result.error.issues.reduce((previousResult, current) => {
                return previousResult ? `${previousResult},${current.message}` : current.message;
            }, '');
        }

        onChange(newInputValue);
        onBlur && onBlur(event);
    }, [inputValue, schema, onChange, onBlur]);

    return (
        <Input
            label={label ? <Label value={label} /> : undefined}
            value={inputValue.value}
            errorMessage={<Message value={inputValue.message} />}
            isInvalid={inputValue.invalid && !!inputValue.message}
            onValueChange={handleChange}
            onBlur={handleBlur}
            {...props}
        />
    )
}
