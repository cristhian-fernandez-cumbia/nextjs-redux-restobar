import React from 'react';

const OrderFilter: React.FC<{
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onFilter: () => void;
}> = ({ startDate, endDate, onStartDateChange, onEndDateChange, onFilter }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
      </div>
      <button
        onClick={onFilter}
        className="bg-green-800 text-white text-center text-base rounded-lg py-2 w-36"
      >
        Aplicar Filtro
      </button>
    </div>
  );
};

export default OrderFilter;