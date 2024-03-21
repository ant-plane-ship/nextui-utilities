import { test, expect } from '@playwright/experimental-ct-react';

import { Test } from '@/components/Test';
import { help } from '@test/helpers/helper-sample';

test('', async ({ mount }) => {
    const component = await mount(<Test />);
    await expect(component).toContainText('テスト');

    help();
});
