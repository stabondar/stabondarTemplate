import path from 'path'
import { defineConfig } from 'vite'

// vite.config.js
export default defineConfig(
{
    base: 'https://domain.vercel.app/',
    build:
    {
        minify: true,
        manifest: true,
        rollupOptions:
        {
            input:'index.html', // defining the entry point explicitly
            output:
            {
                dir: path.resolve(__dirname, 'dist'), // specify the output directory
                format: 'es', // output format (ES modules)
                chunkFileNames: '[name]-[hash].js',
                entryFileNames: 'app.js',
                assetFileNames: 'main-style.[ext]',
                esModule: true,
                compact: true,
                dynamicImportVars: true,
                makeAbsoluteExternalsRelative: true,
            }
        }
    },
    server:
    {
        port: 4321, // server port
        // open: true, // open in browser automatically
        hot: true, // enable hot module replacement
    },
    preview:
    {
        port: 8080,  // specify the port to run the preview server on
        strictPort: true, // if true, the server will fail if the port is already in use
        host: 'localhost',  // define the host, use '0.0.0.0' to expose server to network
        https: false,  // set to true if you need to test with HTTPS
        open: true
    }
})


