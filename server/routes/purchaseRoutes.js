const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, artName, price } = req.body;

  // Gera um número de ordem aleatório
  const orderNumber = Math.floor(Math.random() * 10000);

  // Monta o objeto com os detalhes da compra
  const purchaseDetails = { orderNumber, userId, artName, price };

  // Define o caminho do arquivo compras.json no diretório server/routes/compras
  const filePath = path.join(__dirname, 'compras/compras.json');

  // Verifica se o diretório existe, se não, cria o diretório
  const dirPath = path.join(__dirname, 'compras');
  if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
  }

  // Lê o arquivo JSON existente ou cria um novo se não existir
  fs.readFile(filePath, (err, data) => {
    if (err && err.code === 'ENOENT') {
      // Arquivo não existe, então cria um novo arquivo com um array de compras
      fs.writeFile(filePath, JSON.stringify([purchaseDetails], null, 2), (err) => {
        if (err) {
          console.error('Erro ao criar o arquivo de compras:', err);
          return res.status(500).send('Erro ao processar a compra.');
        }
        res.status(201).send('Compra registrada com sucesso.');
      });
    } else if (err) {
      console.error('Erro ao ler o arquivo de compras:', err);
      return res.status(500).send('Erro ao processar a compra.');
    } else {
      // Arquivo existe, adiciona a nova compra ao array existente
      const purchases = JSON.parse(data);
      purchases.push(purchaseDetails);
      fs.writeFile(filePath, JSON.stringify(purchases, null, 2), (err) => {
        if (err) {
          console.error('Erro ao atualizar o arquivo de compras:', err);
          return res.status(500).send('Erro ao processar a compra.');
        }
        res.status(201).send('Compra registrada com sucesso.');
      });
    }
  });
});

module.exports = router;



