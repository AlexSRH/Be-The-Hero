const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.json({
    event: 'SemanaOmnistack11.0',
    aluno: 'Alexsandro'
  });
});

app.listen(3333);