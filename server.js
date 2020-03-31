const path = require('path')
const express = require('express')

const DIST_DIR = path.join(__dirname, '.')
const PORT = 8080
const HOST = '0.0.0.0'
const app = express()

app.use(express.static(DIST_DIR))

app.get('/health', (req, res, next) => {
    res.send('Ok')
})

app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'))
})

app.listen(PORT, HOST)

console.log(`Running on http://${HOST}:${PORT}`);