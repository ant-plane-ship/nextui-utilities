import { FocusEvent, useCallback, useMemo } from 'react';
import { Input, InputProps } from '@nextui-org/input';
import { ZodString, z } from 'zod';
import { ValidatedInputValue, createValidatedInputValue } from '../_utils/ValidatedInputValue';
import { Message } from './Message';
import { Label } from './Label';

type Props = Omit<InputProps, 'label' | 'value' | 'errorMessage' | 'isInvalid' | 'validationState' | 'onChange' | 'onValueChange'> & {
    testid?: string;
    label?: string;
    /** テスト */
    inputValue: ValidatedInputValue<string>;
    schema?: ZodString;
    onChange: (inputValue: ValidatedInputValue<string>) => void;
}

/**
 * NextUIの<a href="https://nextui.org/docs/components/input" target="_blank">Inputコンポーネント</a>
 */
export const ValidatedStringInput = ({ testid = 'validated-string-input', isRequired, label, inputValue, schema = z.string(), onChange, onBlur, ...props }: Props) => {

    const _schema = useMemo(() => {
        return isRequired ? schema.min(1) : z.union([z.literal(''), schema]);
    }, [isRequired, schema]);

    const handleChange = useCallback((text: string) => {
        onChange(createValidatedInputValue(text, isRequired));
    }, [isRequired, onChange]);

    const handleBlur = useCallback(async (event: FocusEvent) => {
        const newInputValue = { value: inputValue.value, invalid: false, message: '' };
        const result = await _schema.safeParseAsync(inputValue.value);
        newInputValue.invalid = !result.success;
        if (!result.success) {
            newInputValue.message = result.error.issues.reduce((previousResult, current) => {
                return previousResult ? `${previousResult},${current.message}` : current.message;
            }, '');
        }

        onChange(newInputValue);
        onBlur && onBlur(event);
    }, [inputValue, _schema, onChange, onBlur]);

    return (
        <div data-testid={testid} className="w-full h-20">
            <Input
                label={label ? <Label value={label} /> : undefined}
                value={inputValue.value}
                errorMessage={<Message value={inputValue.message} />}
                isInvalid={inputValue.invalid && !!inputValue.message}
                onValueChange={handleChange}
                onBlur={handleBlur}
                {...props}
            />
        </div>
    )
}
