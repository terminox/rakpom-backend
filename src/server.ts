import * as http from 'http'

import app from './express/app'

const host = '0.0.0.0'
const port: number = Number(process.env.PORT) || 8000

const server: http.Server = http.createServer(app)

async function startServer(): Promise<void> {
  server.listen(port, host, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
}

startServer()
