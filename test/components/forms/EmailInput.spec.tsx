import { EmailInput } from '@/components/forms';
import { ValidatedInputValue } from '@/components/forms/ValidatedStringInput';
import { expect, test } from '@playwright/experimental-ct-react';


let inputValue: ValidatedInputValue = { value: '', invalid: false, message: '' };
const handleChange = (_inputValue: ValidatedInputValue) => {
    inputValue = _inputValue;
}


test('', async ({ mount }) => {

    const component = await mount(
        <EmailInput inputValue={inputValue} onChange={handleChange} />
    );

    await expect(component).toHaveText('メールアドレス');
    await expect(component).toHaveScreenshot();

    await component.getByText('メールアドレス').fill('xxxxxxxxxxxx');

    console.log(inputValue);

});
