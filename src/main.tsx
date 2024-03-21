import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { Test } from '@/components/Test';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Test />
    </React.StrictMode>,
)
