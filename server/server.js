const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); // Importando authRoutes
require('dotenv').config();

const app = express();
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });


// Rotas
app.use('/auth', authRoutes); // Usando authRoutes

// Se tiver outros arquivos de rotas, adicione-os aqui
// Exemplo: app.use('/admin', adminRoutes);
const purchaseRoutes = require('./routes/purchaseRoutes');
app.use('/purchase', purchaseRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

