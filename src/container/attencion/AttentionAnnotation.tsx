import React, { useState } from 'react';
import { Clock } from '@/assets/icons';
import { Orden } from '@/interface/attencion';
import Button from '@/components/button/Button';

interface AttentionAnnotationProps {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  updateOrderCount: (newCount: number) => void;
}

const AttentionAnnotation: React.FC<AttentionAnnotationProps> = ({ setComment, comment, updateOrderCount }) => {
  const [message, setMessage] = useState('');
  const currentDate = new Date().toLocaleDateString();

  const handleAddComment = () => {
    updateOrderCount(0)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
    setMessage('');
  };

  return (
    <div className='flex flex-col mt-2'>
      <h2 className='text-green-600 font-bold'>Agregar Comentario</h2>
      <textarea
        className='border border-green-600 rounded-lg p-4 mt-2 outline-none'
        placeholder='Escribe un comentario aquí...'
        rows={4}
        value={comment}
        onChange={handleChange}
      ></textarea>
      <div className='flex items-center mt-2'>
        <Clock className='h-3' />
        <p className='text-xs font-semibold text-gray-500 relative top-[1px]'>{currentDate}</p>
      </div>
      <Button className='bg-green-600 text-white px-3 py-2 mt-2 rounded hover:bg-green-800' >
        Agregar Comentario
      </Button>
      {message && <p className='text-red-600 mt-2'>{message}</p>}
    </div>
  );
};

export default AttentionAnnotation;