const express = require('express');
const app = express();
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());
// routes
app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.post('/api/register', (req, res) => {
    console.log(req.body);
  res.send('POST request to the homepage');
});
// listen
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});