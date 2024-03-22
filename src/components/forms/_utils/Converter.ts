export type Converter<T> = {
    from: (value: T) => string;
    to: (text: string) => T;
}

export const SimpleStringConverter: Converter<string> = {
    from: (value) => value,
    to: (text) => text
}

export const SimpleIntConverter: Converter<number> = {
    from: (value) => value.toString(),
    to: (text) => parseInt(text)
}
