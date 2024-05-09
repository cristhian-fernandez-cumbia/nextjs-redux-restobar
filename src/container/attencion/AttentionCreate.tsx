import React, { useState, useEffect } from 'react';
import Button from '@/components/button/Button';
import { Orden } from '@/interface/attencion';

interface AttentionCreateProps {
  idTable: string;
  onClose: () => void;
}

const AttentionCreate: React.FC<AttentionCreateProps> = ({ onClose, idTable }) => {
  const [existingOrder, setExistingOrder] = useState<Orden | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExistingOrder = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/orders?idtable=${idTable}`);
        console.log('idTable:::', idTable)
        console.log('response:::', response)
        const data = await response.json();
        console.log('data::', data)
        if (data && !data.error) {
          setExistingOrder(data);
        }
      } catch (error) {
        console.error('Error al obtener la orden:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExistingOrder();
  }, [idTable]);

  const handleConfirmation = () => {
    // Aquí puedes implementar la lógica para manejar la confirmación
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (existingOrder) {
    return (
      <div className='flex flex-col mt-2'>
        <h2 className='text-green-600 font-bold'>Actualizar Pedido en la Mesa N°{idTable}</h2>
        <p>Hay un pedido pendiente en esta mesa N°{idTable} con lo siguiente:</p>
        {/* Aquí puedes mostrar los detalles de la orden existente */}
        <div className='flex gap-2 justify-end mt-10'>
          <Button className='bg-primary hover:bg-red-900 px-5 py-2 w-12 flex justify-center text-base font-semibold text-white rounded-lg' onClick={handleConfirmation}>SI</Button>
          <Button className='bg-primary hover:bg-red-900 px-5 py-2 w-12 flex justify-center text-base font-semibold text-white rounded-lg' onClick={onClose}>NO</Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className='flex flex-col mt-2'>
        <h2 className='text-green-600 font-bold'>Crear Pedido en la Mesa N°{idTable}</h2>
        <p>Crea un nuevo pedido en esta mesa N°{idTable} con lo siguiente:</p>
        {/* Aquí puedes mostrar los detalles del nuevo pedido */}
        <div className='flex gap-2 justify-end mt-10'>
          <Button className='bg-primary hover:bg-red-900 px-5 py-2 w-12 flex justify-center text-base font-semibold text-white rounded-lg' onClick={handleConfirmation}>SI</Button>
          <Button className='bg-primary hover:bg-red-900 px-5 py-2 w-12 flex justify-center text-base font-semibold text-white rounded-lg' onClick={onClose}>NO</Button>
        </div>
      </div>
    );
  }
};

export default AttentionCreate;