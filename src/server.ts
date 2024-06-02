import * as http from 'http'

import app from './express/app'

const PORT: number = Number(process.env.PORT) || 8000

const server: http.Server = http.createServer(app)

async function startServer(): Promise<void> {
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

startServer()
