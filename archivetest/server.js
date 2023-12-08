import { createServer } from 'http';
import { readFileSync, readFile, writeFile } from 'fs';
import url from 'url';

const port = 8082;

readFile('./index.html', function (error, html) {
    createServer(function (req, res) {
      if (req.url === '/archive.js') {
        readFile('./archive.js', function (error, scriptContent) {
          if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error reading archive.js');
          } else {
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.write(scriptContent);
            res.end();
          }
        });
      }
      else if (req.url === '/data') {
        readFile('./test_convos.json', 'utf8', (err, data) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error reading convo data');
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
          }
        });
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
      }
    }).listen(port);
  });