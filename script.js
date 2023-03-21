const http = require('node:http');
const {parse} = require('querystring');

let user = {user_agent: 0};
let body = "";

const hostname = '127.0.0.1';
const port = '3000';

const server = http.createServer((req, res) => {
    if (req.method === 'GET'){
        if (req.url === '/'){
            console.log(req.method);
            res.writeHead(200, {'Content-Type': 'text/plain; charset = utf-8'});
        }
        else if (req.url === '/stats'){
            console.log(req.method);
            res.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'});
            user.user_agent++;
            res.end(`<table>
            <tr><th>User-agent:</th><th>Request:</th></tr>
            <tr><td>${req.headers['user-agent']}</td><td>${user.user_agent}</td></tr>
            </table>`);
            // console.table({'User-agent': req.headers['user-agent'], 'Requests': user.user_agent});
        }
        else {
            res.writeHead(400, {'Content-Type': 'text/plain; charset = utf-8'});
            res.end('400 Bad Request!');
        }
    }
    else if (req.method === 'POST'){
        if (req.url === '/comments') {
            console.log(req.method);
            res.writeHead(200, {'Content-Type': 'text/plain; charset = utf-8'});
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                let params = parse(body);
                console.log(params);
                res.end("Данные успешно отправлены!");
            });
        }
        else {
            res.writeHead(400, {'Content-Type': 'text/plain; charset = utf-8'});
            res.end('400 Bad Request!');
        }
    }
});

server.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});

server.on('error', err => {
    if (err.code  === 'EACCES'){
        console.log(`No access to port: ${port}`);
    }
});