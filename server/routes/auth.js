const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Rota de registro
router.post('/register', async (req, res) => {
  try {
    const newUser = new User({ ...req.body });
    await newUser.save();
    res.status(201).send('Usuário registrado com sucesso.');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Rota de login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(200).json({ message: 'Login bem-sucedido', userId: user._id });
    } else {
      res.status(400).send('Usuário não encontrado.');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

  
