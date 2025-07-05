import express from 'express'

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

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(`http://localhost:${port}`)
})

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  console.log('Cliente WebSocket conectado');

  ws.on('message', function message(data) {
    console.log('Mensaje recibido: %s', data);
    // Envía el mensaje de vuelta a todos los clientes conectados
    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(data.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('Cliente WebSocket desconectado');
  });

  ws.send('Conexión WebSocket establecida');
});
