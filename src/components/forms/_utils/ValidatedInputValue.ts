export type ValueType = string | number;

export type ValidatedInputValue<T extends ValueType = string> = {
    value: T;
    invalid: boolean;
    message: string;
}

export const createInitialValidatedInputValue = <T extends ValueType>(value: T): ValidatedInputValue<T> => ({
    value,
    invalid: false,
    message: ''
});
