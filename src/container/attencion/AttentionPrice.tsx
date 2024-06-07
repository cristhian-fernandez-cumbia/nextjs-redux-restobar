import Button from '@/components/button/Button';
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
      <div className='flex gap-2 justify-end mt-10'>
        <Button className='bg-green-500 hover:bg-green-700 px-5 py-2 w-12 flex justify-center text-base font-semibold text-white rounded-lg' onClick={handleSubmit}>SI</Button>
        <Button className='bg-primary hover:bg-red-900 px-5 py-2 w-12 flex justify-center text-base font-semibold text-white rounded-lg' onClick={onClose}>NO</Button>
      </div>
    </div>
  );
};

export default AttentionPrice;