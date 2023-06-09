const express = require('express');
const app = express();
const db = require('./db');

const port = process.env.PORT || 3000;

/*app.get('/', (req, res) => {
  res.send('Hello World!');
});*/

app.get('/', async (req, res) => {
  try {
    const database = await db();
    const teams = await database.teams.find({}).toArray();
    return res.json(teams);
} catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
}
})


app.get('/ip', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  return res.json(ip);
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});