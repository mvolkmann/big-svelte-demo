const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let lastId = 0;
const dogs = {};

function mustExist(res, id) {
  const dog = dogs[id];
  if (!dog) res.status(404).send(`no dog with id ${id} found`);
  return dog;
}

const sendJson = (res, obj) => res.send(JSON.stringify(obj));

app.post('/', (req, res) => {
  const { breed, name } = req.body;
  const dog = { id: ++lastId, breed, name };
  dogs[dog.id] = dog;
  console.log('server.js post: dogs =', dogs);
  sendJson(res, dog);
});

app.get('/', (req, res) => {
  console.log('server.js get: dogs =', dogs);
  sendJson(res, dogs);
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const dog = mustExist(res, id);
  if (dog) sendJson(res, dog);
});

app.put('/:id', (req, res) => {
  const { id } = req.params;
  const { breed, name } = req.body;
  if (mustExist(res, id)) {
    const dog = { breed, id, name };
    dogs[id] = dog;
    console.log('server.js put: dogs =', dogs);
    sendJson(res, dog);
  }
});

app.delete('/:id', (req, res) => {
  const { id } = req.params;
  if (mustExist(res, id)) {
    delete dogs[id];
    console.log('server.js delete: dogs =', dogs);
    res.send();
  }
});

const PORT = 1919;
app.listen(PORT, () => console.log('listening on', PORT));
