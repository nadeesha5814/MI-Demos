const net = require('net');
const fs = require('fs');
const path = require('path');

// Define the host and port for the TCP server
const HOST = '127.0.0.1';
const PORT = 12345;

// Create a write stream for logging
const logFilePath = path.join(__dirname, 'tcp_server.log');
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Function to log messages to both console and log file
function logMessage(message) {
    console.log(message);
    logStream.write(`${new Date().toISOString()} - ${message}\n`);
}

// Create a new TCP server
const server = net.createServer((socket) => {
    const clientInfo = `${socket.remoteAddress}:${socket.remotePort}`;
    logMessage(`Connection from: ${clientInfo}`);

    // Set the encoding for incoming data
    socket.setEncoding('utf-8');

    // Handle incoming data
    socket.on('data', (data) => {
        logMessage(`Received data from ${clientInfo}: ${data}`);
    });

    // Handle client disconnection
    socket.on('end', () => {
        logMessage(`Client ${clientInfo} disconnected`);
    });

    // Handle errors
    socket.on('error', (err) => {
        logMessage(`Socket error from ${clientInfo}: ${err}`);
    });
});

// Start the server and listen on the specified host and port
server.listen(PORT, HOST, () => {
    logMessage(`TCP server listening on ${HOST}:${PORT}`);
});
