import React, { useState } from 'react';

interface AttentionPriceProps {
  onClose: () => void;
  setNewPrice: (newPrice: number) => void;
  currentPrice: number;
}

const AttentionPrice: React.FC<AttentionPriceProps> = ({ onClose, setNewPrice, currentPrice }) => {
  const [price, setPrice] = useState(currentPrice);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const handleSubmit = () => {
    setNewPrice(price);
    onClose();
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Cambiar Precio</h2>
      <input
        type="number"
        value={price}
        onChange={handlePriceChange}
        className="border p-2 mb-4 w-full"
        min="0"
      />
      <div className="flex justify-end">
        <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">
          Cancelar
        </button>
        <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded">
          Sí
        </button>
      </div>
    </div>
  );
};

export default AttentionPrice;