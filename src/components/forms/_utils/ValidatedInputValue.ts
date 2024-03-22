export type ValueType = string | number;

export type ValidatedInputValue<T extends ValueType = string> = {
    value: T;
    invalid: boolean;
    message: string;
}

export const createValidatedInputValue = <T extends ValueType>(value: T, required?: boolean): ValidatedInputValue<T> => ({
    value,
    invalid: !!required && !value,
    message: ''
});
