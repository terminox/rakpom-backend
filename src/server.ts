import * as http from 'http'

import app from './express/app'
import admin  from 'firebase-admin'

import serviceAccount from '../rakpom-852a4-firebase-adminsdk-wc4sw-ae9dfd9ca7.json'

const host = '0.0.0.0'
const port: number = Number(process.env.PORT) || 8000

const server: http.Server = http.createServer(app)

async function startServer(): Promise<void> {
  server.listen(port, host, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  })
}

startServer()
