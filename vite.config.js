import {defineConfig} from 'vite';
import {fileURLToPath} from 'node:url';
export default defineConfig({resolve:{alias:{'@':fileURLToPath(new URL('./vendor',import.meta.url))}},server:{host:'0.0.0.0',port:1337}});
