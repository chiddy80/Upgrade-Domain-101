const express = require('express');
const WebSocket = require('ws');

const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`WebSocket server running on port ${PORT}`);
});

const wss = new WebSocket.Server({ 
  server,
  path: '/'
});

// Basic HTTP route
app.get('/', (req, res) => {
  res.send('WebSocket server is running!');
});

// WebSocket connection
wss.on('connection', (ws, req) => {
  console.log('Client connected from:', req.socket.remoteAddress);
  ws.send('Welcome to North Africa WebSocket!');
  
  ws.on('message', (message) => {
    console.log('Received:', message.toString());
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
