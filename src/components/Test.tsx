import { Common } from '@/components/Common';
import { EmailInput } from './forms';

export const Test = () => {
    return (
        <div>
            <div>テスト</div>
            <Common />
            <EmailInput value="" onChange={() => { }} />
        </div>
    )
}
