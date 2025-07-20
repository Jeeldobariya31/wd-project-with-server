const http = require("http");

const PORT = process.env.PORT || 3333;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`<h1>✅ Hello from DevTunnel on port ${PORT}</h1>`);
});

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}/`);
});
