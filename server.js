const { createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')
const server = require('express')()

server.get('/', async (req, res) => {
    const app = createSSRApp({
        template: `<App/>`
    })

    app.component('App',require('./App'))

    const appContent = await renderToString(app)

    const html = `
  <html lang="zh-CN">
    <body>
      ${appContent}
    </body>
  </html>
  `

    res.end(html)
})

server.listen(3303)
