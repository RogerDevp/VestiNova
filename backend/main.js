import express from 'express'
import authRouter from './src/routes/AuthRouter.js'
import empleadoRouter from './src/routes/EmpleadoRouter.js'
import productoRouter from './src/routes/ProductoRouter.js'

import { WebSocketServer } from 'ws'

import morgan from 'morgan'
import cors from 'cors'

const app = express()
const port = 3001

app.use(morgan("dev"))

//app.use(cors({ origin: 'http://localhost:8080' })) // habilitar CORS para el frontend
app.use(cors()); // Permite todas las fuentes

app.use(express.json())

// app.use('/api', DatosRouter)
app.use('/auth',      authRouter)
app.use('/empleados', empleadoRouter)
app.use('/productos', productoRouter)


const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(`http://localhost:${port}`)
})

const wss = new WebSocketServer({ server });

wss.on('connection', ws => {
  console.log('Cliente WebSocket conectado')

  ws.on('message', data => {
    console.log('Mensaje recibido:', data.toString())
    // Reenvía a todos los clientes
    wss.clients.forEach(c => {
      if (c.readyState === WebSocket.OPEN) c.send(data.toString())
    })
  })

  ws.on('close', () => console.log('Cliente WebSocket desconectado'))

  ws.send('Conexión WebSocket establecida')
})