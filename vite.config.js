import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [
                // Auto register icon components
                // 自动注册图标组件
                IconsResolver({
                    prefix: 'i', // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
                    // {prefix}-{collection}-{icon} 使用组件解析器时，您必须遵循名称转换才能正确推断图标。
                    // alias: { park: 'icon-park' } 集合的别名
                    // enabledCollections: ['ep'] // 这是可选的，默认启用 Iconify 支持的所有集合['mdi']

                }),
            ],
        }),
        Icons({
            // scale: 1, // 缩放
            compiler: 'vue3', // 编译方式
            // defaultClass: '', // 默认类名
            // defaultStyle: '', // 默认样式
            autoInstall: true,
            // jsx: 'react' // jsx支持
        }),
    ],
    // 配置项目别名
    resolve: {
        alias: {
            '@': path.resolve(__dirname,'src'),
        },
    },
    server: {
        host: 'localhost',
        port: '5173',
        proxy: {
            '/bing': {
                target: 'http://cn.bing.com/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/bing/, '') // 不可以省略rewrite
            }
        }
    }
})
