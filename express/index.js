const { randomBytes } = require('crypto');

const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.requestId = randomBytes(16).toString('hex');
  console.log(`${new Date().toISOString()} ${req.requestId} -> ${req.method} ${req.path}`);
  next();
});

app.get('/v1/echo', (req, res, next) => {
	res.send('hello world\n');
	next();
});
app.post('/v1/echo', (req, res, next) => {
	res.json(req.body);
	next();
});
app.post('/v1/echo/:id', (req, res, next) => {
	res.json({ id: req.params.id });
	next();
});

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.requestId} <- ${req.method} ${req.path}`);
  next();
});

app.listen(8080, () => console.log(`Listening on port 8080`));
