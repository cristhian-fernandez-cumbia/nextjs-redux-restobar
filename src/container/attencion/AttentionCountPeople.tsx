import { ArrowLeft, ArrowRight } from '@/assets/icons';
import React, { useState, useEffect, useRef } from 'react';

interface AttentionCountPeopleProps {
  idTable: string;
  setCountPeople: React.Dispatch<React.SetStateAction<number>>;
}

interface AttentionPeople {
  idTable: string;
  numPersons: number;
}

const AttentionCountPeople: React.FC<AttentionCountPeopleProps> = ({ idTable, setCountPeople }) => {
  const [selectedNumber, setSelectedNumber] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const attentionPeople: AttentionPeople[] = JSON.parse(localStorage.getItem('attentionPeople') || '[]');
    const selectedOption = attentionPeople.find((option) => option.idTable === idTable);
    if (selectedOption) {
      setCountPeople(selectedOption.numPersons);
      setSelectedNumber(selectedOption.numPersons);
    }
  }, [idTable]);

  const handleNumberClick = (number: number) => {
    setSelectedNumber(number);
    const attentionPeople: AttentionPeople[] = JSON.parse(localStorage.getItem('attentionPeople') || '[]');
    const updatedOptions = attentionPeople.filter((option) => option.idTable !== idTable);
    updatedOptions.push({ idTable, numPersons: number });
    localStorage.setItem('attentionPeople', JSON.stringify(updatedOptions));
    setCountPeople(number);
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  return (
    <div className='flex mb-4 flex-col overflow-hidden'>
      <p className='mb-3'>
        Cantidad de Personas:
        <span className='ml-2 text-xl font-semibold'>{selectedNumber === null ? '0' : selectedNumber}</span>
      </p>
      <div className='flex items-center space-x-2 justify-center'>
        <button onClick={handleScrollLeft} className="bg-red-400 px-2 py-2 rounded-full hover:bg-primary">
          <ArrowLeft />
        </button>
        <div ref={scrollContainerRef} className='flex gap-2 overflow-x-auto scrollbar-hide' style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          {[...Array(20)].map((_, index) => (
            <button
              key={index}
              onClick={() => handleNumberClick(index + 1)}
              className={`px-4 py-2 rounded bg-gray-300 focus:outline-none ${
                selectedNumber === index + 1 ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button onClick={handleScrollRight} className="bg-red-400 px-2 py-2 rounded-full hover:bg-primary">
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default AttentionCountPeople;