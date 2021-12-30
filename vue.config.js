module.exports = {
    configureWebpack: config => {
        //跨域api的设置
        if (process.env.NODE_ENV === 'production') {
            Object.assign(config, {
                devServer: {
                    proxy: {
                        '/api': {
                            target: '/',
                            ws: true,
                            changeOrigin: true
                        }
                    }
                }
            })
        } else {
            Object.assign(config, {
                devServer: {
                    proxy: {
                        '/api': {
                            target: 'http://localhost:3000/',
                            ws: true,
                            changeOrigin: true
                        }
                    }
                }
            })
        }
    },
    chainWebpack: config => {
        config.module
            .rule('images')
                .use('url-loader')
                .tap(options => Object.assign(options, { limit: 10240 }))
    },
    pages: {
        index: {
            entry: 'src/views/index/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: '唯品会',
            chunks: ["chunk-vendors", "chunk-common", "index"]
        },
        manage: {
            entry: 'src/views/manage/main.js',
            template: 'public/manage.html',
            filename: 'manage.html',
            title: '后台管理',
            chunks: ['chunk-vendors', 'chunk-common', 'manage']
        }
    }
}