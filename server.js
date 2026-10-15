import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');if(url.pathname==='/health'){res.writeHead(200);return res.end('ok');}const file=path.resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));if(!file.startsWith(root+path.sep))throw Error();const body=await readFile(file);if(url.pathname==='/halo.html'){res.setHeader('Cross-Origin-Opener-Policy','same-origin');res.setHeader('Cross-Origin-Embedder-Policy','require-corp');res.setHeader('Permissions-Policy','cross-origin-isolated=(self "https://openhaloce.com")');}res.writeHead(200,{'Content-Type':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html','Cache-Control':'no-cache'});res.end(body);}catch{res.writeHead(404);res.end('Not found');}}).listen(1337,'0.0.0.0');
