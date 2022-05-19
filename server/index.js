const path = require('path')
const morgan = require('morgan')
const express = require('express');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/api", (req, res) => {
    res.json({ message: 'Hello from Express!' });
})
// auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'public/index.html')));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/client/public/index.html'));
})

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

module.exports = app 