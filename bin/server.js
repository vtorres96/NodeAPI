const app = require('../src/app')
const debug = require('debug')('node_project:server')
const http = require('http') 

const port = normalizePort(process.env.PORT || '3000') 
app.set('port', port) 

const server = http.createServer(app) 

server.listen(port) 
server.on('error', onError) 
server.on('listening', onListening) 
console.log('API rodando na porta ' + port) 

function normalizePort(val) {
  const port = parseInt(val, 10) 

  if (isNaN(port)) {
    return val 
  }

  if (port >= 0) {
    return port 
  }

  return false 
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error 
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port 

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges') 
      process.exit(1) 
      break 
    case 'EADDRINUSE':
      console.error(bind + ' is already in use') 
      process.exit(1) 
      break 
    default:
      throw error 
  }
}

function onListening() {
  const addr = server.address() 
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port 
  debug('Listening on ' + bind) 
}

/* SITE FREELA 
e-commerce de pão artesanal que terá obrigatoriamente => carrinho, checkout, finalizar 
quer criar um e-commerce baseado na idéia de alveole e o levain.club
o e-commerce terá foto dos pães, descrição breve dos ingredientes e também o preço 
necessita do site ser responsivo (obrigatório qualquer site) e que tenha um UX descente
terá entrega através de delivery e também onde o cliente irá retirar o produto
6 pag e com 5 pag */
