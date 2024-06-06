import React, { useState } from 'react';
import { Clock } from '@/assets/icons';
import Button from '@/components/button/Button';

interface AttentionAnnotationProps {
  onClose: () => void;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  comment: string;
  updateOrderCommet: () => void;
}

const AttentionAnnotation: React.FC<AttentionAnnotationProps> = ({ onClose, setComment, comment, updateOrderCommet }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const currentDate = new Date().toLocaleDateString();

  const handleAddComment = () => {
    updateOrderCommet()
    setLoading(true);
    setTimeout(() => {
      setMessage(comment.length === 0 ? 'No se agrego comentarios': 'Comentario editado correctamente');
      setLoading(false);
      setTimeout(() => {
        setMessage('');
        onClose();
      }, 1000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    setMessage('');
  };

  return (
    <div className='flex flex-col mt-2'>
      <h2 className='text-green-600 font-bold'>Agregar Comentario</h2>
      <textarea
        className='border border-green-600 rounded-lg p-4 mt-2 outline-none text-black'
        placeholder='Escribe un comentario aquí...'
        rows={4}
        value={comment}
        onChange={handleChange}
      ></textarea>
      <div className='flex items-center mt-2'>
        <Clock className='h-3' />
        <p className='text-xs font-semibold text-gray-500 relative top-[1px]'>{currentDate}</p>
      </div>
      <Button
        className={`${comment.length === 0 ? 'bg-red-600 hover:bg-red-800': 'bg-green-600 hover:bg-green-800'}  text-white px-3 py-2 mt-2 rounded `}
        onClick={handleAddComment}
        disabled={loading}
      >
        {loading ? 'Cargando...' : comment.length === 0 ? 'Sin Comentarios': 'Guardar Comentario'}
      </Button>
      {message && <p className={`${comment.length === 0 ? 'text-red-600': 'text-green-600 '} mt-2`}>{message}</p>}
    </div>
  );
};

export default AttentionAnnotation;