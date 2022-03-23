const express = require('express')
const path = require('path')

const app = express()

// static middleware
app.use('/dist', express.static(path.join(__dirname, '../dist')))
app.use(express.json());


app.use('/api/students', require('./routes/students'));
app.use('/api/campuses', require('./routes/campuses'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
}); 

module.exports = app;

