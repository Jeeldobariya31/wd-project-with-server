require('dotenv').config(); // for local development

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 5000;

const mimeTypes = {
  ".html": "text/html",
  ".htm": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

// ✅ Create the server
const server = http.createServer((req, res) => {
  const reqUrl = req.url === "/" ? "/default.html" : req.url.toLowerCase();
  const ext = path.extname(reqUrl);
  let contentType = mimeTypes[ext] || "text/html";

  const routes = {
    "/home": "home.html",
    "/contactus.html": "contactus.html",
    "/culture.html": "culture.html",
    "/cusine.html": "cusine.html",
    "/landmarks.html": "landmarks.html",
  };

  // ✅ Handle Static Files (CSS, JS, images, etc.)
  if (ext && mimeTypes[ext]) {
    const filePath = path.join(__dirname, decodeURIComponent(reqUrl));
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("❌ Static file not found.");
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      }
    });
    return;
  }

  // ✅ Handle Routes like /home, /culture.html
  const fileToLoad = routes[reqUrl] || "default.html";
  const filePath = path.join(__dirname, fileToLoad);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("❌ Error loading page.");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

// ✅ Start the server
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}/`);
});
