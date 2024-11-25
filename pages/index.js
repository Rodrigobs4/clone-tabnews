import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const LoveMessage = () => {
  const [showHearts, setShowHearts] = useState(false);
  const [hearts, setHearts] = useState([]);

  const createHeart = () => {
    return {
      id: Math.random(),
      x: Math.random() * 80 + 10, // posição x entre 10% e 90%
      y: Math.random() * 40 + 30, // posição y entre 30% e 70%
      scale: Math.random() * 0.5 + 0.5, // tamanho entre 0.5 e 1
    };
  };

  const handleClick = () => {
    setShowHearts(true);
    const newHearts = Array(12).fill(null).map(() => createHeart());
    setHearts(newHearts);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center relative overflow-hidden">
      <h1 className="text-4xl font-bold text-pink-600 mb-8">
        Para o Amor da Minha Vida
      </h1>
      
      {!showHearts && (
        <button
          onClick={handleClick}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition hover:scale-105"
        >
          Abrir ♥
        </button>
      )}

      {showHearts && (
        <div className="text-center">
          <p className="text-2xl text-pink-600 font-semibold mb-4 animate-bounce">
            Eu te amo muito! ♥
          </p>
          {hearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute animate-float"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                transform: `scale(${heart.scale})`,
              }}
            >
              <Heart
                className="text-pink-500 animate-pulse"
                fill="currentColor"
                size={32}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Adicione estes estilos no seu arquivo CSS global ou use uma biblioteca de animações
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
  }
  .animate-float {
    animation: float 3s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default LoveMessage;