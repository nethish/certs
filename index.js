const fs = require('fs');
const key = fs.readFileSync('../localhost/localhost.decrypted.key');
const cert = fs.readFileSync('../localhost/localhost.crt');

const express = require('express');
const app = express();

app.enable('trust proxy')
app.use((req, res, next) => {
    req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
})

app.get('/', (req, res, next) => {
  console.log("Req", req)
  res.status(200).send('Hello world!');
});

const https = require('https');
const server = https.createServer({ key, cert }, app);

const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on https://localhost:${port}`);
});
