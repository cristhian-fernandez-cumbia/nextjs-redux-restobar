import React from 'react';

interface OrderFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onFilter: () => void;
}

const OrderFilter: React.FC<OrderFilterProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onFilter,
}) => {
  return (
    <div>
      <label>Fecha de inicio:</label>
      <input type="date" value={startDate} onChange={(e) => onStartDateChange(e.target.value)} />
      <label>Fecha de fin:</label>
      <input type="date" value={endDate} onChange={(e) => onEndDateChange(e.target.value)} />
      <button onClick={onFilter}>Filtrar</button>
    </div>
  );
};

export default OrderFilter;
