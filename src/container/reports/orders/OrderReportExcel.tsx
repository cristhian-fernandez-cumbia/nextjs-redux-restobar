import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { OrderItem, OrderReportProps } from '@/interface/order';
import Button from '@/components/button/Button';

const OrderReport: React.FC<OrderReportProps> = ({ orders }) => {
  const handleReportExcel = () => {
    const result: OrderItem[] = orders.flatMap(order =>
      order.OrdersDishes.map(dish => ({
        idPedido: order.idOrder,
        fecha: order.fecha,
        dish: dish.Dishes.name,
        price: dish.price,
        count: dish.count,
        total: Number(dish.price) * Number(dish.count),
        paymentType: order.paymentType,
        idTable: order.idTable,
        numPersons: order.numPersons
      }))
    );

    const worksheetData = [
      ["Nro Pedido", "Fecha", "Plato", "P.unitario", "Cantidad", "Total", "Tipo Pago", "Mesa", "Nro Personas"],
      ...result.map(item => [
        item.idPedido,
        item.fecha,
        item.dish,
        item.price,
        item.count,
        item.total,
        item.paymentType,
        `Mesa #${item.idTable}`,
        item.numPersons
      ])
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    const merges: XLSX.Range[] = [];
    let currentOrder = worksheetData[1][0];
    let startRow = 1;

    worksheetData.forEach((row, index) => {
      if (index === 0) return;
      if (row[0] !== currentOrder) {
        if (startRow < index - 1) {
          merges.push({ s: { r: startRow, c: 0 }, e: { r: index - 1, c: 0 } });
        }
        currentOrder = row[0];
        startRow = index;
      }
    });

    if (startRow < worksheetData.length - 1) {
      merges.push({ s: { r: startRow, c: 0 }, e: { r: worksheetData.length - 1, c: 0 } });
    }

    worksheet['!merges'] = merges;

    const headerRange = XLSX.utils.decode_range("A1:I1");
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: headerRange.s.r, c: C });
      if (!worksheet[cellAddress]) worksheet[cellAddress] = { t: "s" };
      worksheet[cellAddress].s = {
        fill: {
          patternType: "solid",
          fgColor: { rgb: "00FF00" },
        },
        font: {
          bold: true,
        },
      };
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Reporte_Ordenes.xlsx');
  };

  return (
    <Button className='bg-green-800 text-white text-center text-base rounded-lg py-2 w-36' onClick={handleReportExcel}>
      Exportar Excel
    </Button>
  );
};

export default OrderReport;