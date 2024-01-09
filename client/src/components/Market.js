import React, { useState } from 'react';

function Market() {
  // Substitua esta parte pela sua lógica de autenticação para obter o usuário logado
  const [user, setUser] = useState({ _id: 'id_usuario_logado', email: 'email_usuario' });

  // Lista de artes (adicionar abaixo do estado do usuário)
  const artworks = [
    { name: 'Rio de Janeiro Cyberpunk', price: 100, imageUrl: '/caminho/para/imagem1.jpg' },
    { name: 'São Paulo Cyberpunk', price: 120, imageUrl: '/caminho/para/imagem2.jpg' },
    { name: 'Minas Gerais Cyberpunk', price: 90, imageUrl: '/caminho/para/imagem3.jpg' },
    { name: 'Bahia Cyberpunk', price: 110, imageUrl: '/caminho/para/imagem4.jpg' }
  ];

  // Função handlePurchase (adicionar abaixo da lista de artes)
  const handlePurchase = async (artName, price) => {
    if (!user || !user._id) {
      alert('Faça o login para realizar a compra.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/market/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, artName, price })
      });

      if (response.status === 201) {
        alert('Compra realizada com sucesso!');
      } else {
        alert('Erro ao realizar a compra.');
      }
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
    }
  };

  // Renderização dos cards (substituir a renderização atual)
  return (
    <div style={{ background: 'linear-gradient(to right, black, red)', overflowY: 'scroll', height: '500px' }}>
      {artworks.map((art, index) => (
        <div key={index} style={{ margin: '10px', border: '1px solid white', padding: '10px', textAlign: 'center' }}>
          <img src={art.imageUrl} alt={art.name} style={{ width: '100%', height: '200px' }} />
          <h3>{art.name}</h3>
          <p>Preço: R$ {art.price}</p>
          <button onClick={() => handlePurchase(art.name, art.price)} disabled={!user._id}>Comprar</button>
        </div>
      ))}
    </div>
  );
}

export default Market;
