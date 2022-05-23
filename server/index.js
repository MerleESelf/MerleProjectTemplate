const morgan = require('morgan')
const express = require('express');

const PORT = 3001;
const app = express();

app.use(morgan("tiny"));

app.get("/api", (req, res) => {
    res.json({ message: 'Hello from Express!' });
})

// auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))


// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

 