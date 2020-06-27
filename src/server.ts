import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({ 
    mensagem: 'Hello Word',
    submensagem: 'Deibson Cogo',
  });
});

app.listen(3333, () => {
  console.log('SERVIDOR RODANDO NA PORTA 3333');
});
