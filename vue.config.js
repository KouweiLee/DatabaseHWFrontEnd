const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,

    pluginOptions: {
        vuetify: {
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        }
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        client: {
            webSocketURL: 'ws://0.0.0.0:8080/ws',
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    }
})
