import React, { useState } from 'react';
import Modal from '@/components/modal/Modal';
import Button from '@/components/button/Button';
import { Orden } from '@/interface/attencion';
import { formatDatecurrent } from '@/utils/functions';

const OrderWhatsapp: React.FC<{ idTable: string; onClose: () => void; priceTotal: number; }> = ({ idTable, onClose, priceTotal }) => {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/^\d{0,9}$/.test(inputValue)) {
      setWhatsappNumber(inputValue);
      setErrorMessage('');
    } else {
      setErrorMessage('El número ingresado debe ser solo de 9 dígitos');
    }
  };

  const handleSubmit = () => {
    if (whatsappNumber.length !== 9) {
      setErrorMessage('El número ingresado debe ser solo de 9 dígitos');
    } else {
      let fecha = formatDatecurrent(new Date());
      let pedidos: Orden[] = JSON.parse(localStorage.getItem('pedidos') || '[]');
      const pedidosFiltrados = pedidos.filter(pedido => pedido.idTable === idTable);
      const mensaje = encodeURIComponent(`*Detalle del Pedido (${fecha}):*\n${formatMessage(pedidosFiltrados)}\n*TOTAL: ${priceTotal}.00*\nGracias por su preferencia en Bohemia :)`);
      window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${mensaje}`, '_blank');
      onClose();
    }
  };

  const formatMessage = (pedidos: Orden[]) => {
    return pedidos.map(pedido => {
      return `[${pedido.count}] ${pedido.name} - ${pedido.price}.00`;
    }).join('\n');
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Enviar Pedido por WhatsApp</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Ingrese 9 Dígitos del Número de WhatsApp:</label>
          <input
            type="text"
            value={whatsappNumber}
            onChange={handleChange}
            placeholder="Ingrese el número de WhatsApp"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSubmit} className="bg-green-700 text-white rounded-lg px-4 py-2 hover:bg-green-600">
            Enviar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderWhatsapp;