import * as denodeify from 'denodeify';

const SilentError = require('silent-error');
const net = require('net');
function checkPort(port, host = '0.0.0.0', basePort = 49152) {
    return new Promise((resolve, reject) => {
      let server = net.createServer(() => {});

      server.once('error', (err) => {
        reject(new SilentError(`Port ${port} is already in use. Use '--port' to specify a different port.`));
        server.close();
      });

      server.once('listening', () => {
        resolve(port);
        server.close();
      });

      server.listen(port, host);
    });
}
