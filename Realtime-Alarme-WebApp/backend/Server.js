const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
console.log('Serveur WebSocket démarré sur ws://localhost:8080');

wss.on('connection', ws => {
  console.log('Nouveau client connecté');

  ws.on('message', message => {
    console.log('Message reçu:', message);

    // Diffuser à tous les autres clients
    wss.clients.forEach(client => {
      if(client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client déconnecté');
  });
});
