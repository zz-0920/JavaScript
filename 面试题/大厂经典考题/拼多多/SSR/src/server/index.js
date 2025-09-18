const express = require('express')
const React = require('react')
const Home = require('../pages/Home.jsx').default
const { renderToString } = require('react-dom/server')

const app = express()

const content = renderToString(React.createElement(Home))

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>SSR</title>
      </head>
      <body>
        <div id="root">${content}</div>
      </body>
    </html>
  `)
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})