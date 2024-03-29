import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'nextui-util-libs',
            fileName: 'nextui-util-libs',
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: ['react'],
            output: {
                globals: { react: 'React' }
            }
        }
    },
    plugins: [react(), tsconfigPaths()],
});
