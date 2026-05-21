const http = require('http');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const PORT = process.env.PORT ? Number(process.env.PORT) : 8787;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
};

function sendJson(res, code, body) {
  const payload = JSON.stringify(body);
  res.writeHead(code, { 'Content-Type': MIME['.json'], 'Content-Length': Buffer.byteLength(payload) });
  res.end(payload);
}

function sendFile(res, filePath) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  if (!req.url) return sendJson(res, 400, { ok: false });
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'POST' && url.pathname === '/api/dispatch') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = body ? JSON.parse(body) : {};
        
        const { data, error } = await resend.emails.send({
          from: 'hello@cdhrentals.com',
          to: 'office@cdhrentals.com',
          replyTo: payload.email || 'hello@cdhrentals.com',
          subject: 'New Dispatch Request',
          html: `
            <h2>New Dispatch Request</h2>
            <p><strong>Tonnage:</strong> ${payload.tonnage || 'N/A'}</p>
            <p><strong>Region:</strong> ${payload.region || 'N/A'}</p>
            <p><strong>Needed By:</strong> ${payload.neededBy || 'N/A'}</p>
            <p><strong>Phone:</strong> ${payload.phone || 'N/A'}</p>
            <p><strong>Email:</strong> ${payload.email || 'N/A'}</p>
            <p><strong>Description:</strong> ${payload.description || 'N/A'}</p>
          `
        });

        if (error) {
          console.error(error);
          return sendJson(res, 500, { ok: false, error: error.message });
        }

        sendJson(res, 200, { ok: true, received: payload, id: data?.id });
      } catch (err) {
        console.error(err);
        sendJson(res, 400, { ok: false, error: 'Failed to process request' });
      }
    });
    return;
  }

  let pathname = decodeURIComponent(url.pathname);
  if (pathname === '/') pathname = '/cdh-homepage-v3.html';
  const filePath = path.join(ROOT, pathname);
  if (!filePath.startsWith(ROOT)) {
    sendJson(res, 403, { ok: false, error: 'Forbidden' });
    return;
  }
  sendFile(res, filePath);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
