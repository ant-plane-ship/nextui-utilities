import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'nextui-utilities',
            fileName: 'index',
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: ['react', 'react-dom', '@nextui-org/react', 'framer-motion'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    '@nextui-org/react': 'NextUI',
                    'framer-motion': 'FramerMotion'
                }
            }
        }
    },
    plugins: [react(), tsconfigPaths(), dts({ rollupTypes: true })]
});
