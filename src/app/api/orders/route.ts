import { NextResponse } from "next/server";
import db from "@/libs/db";

interface Dish {
  idDish: number;
  count: number;
  price: number;
  comment?: string;
}

interface OrderData {
  idTable: number;
  numPersons: number;
  paymentType?: string;
  orderType?: string;
  fecha?: Date;
  total?: number;
  status: string;
  active: boolean;
  dishes: Dish[];
}

export async function POST(request: any) {
  try {
    const requestBody = await request.json();
    if (!requestBody) {
      throw new Error('No hay datos en el cuerpo de la solicitud');
    }

    console.log('requestBody::', requestBody)
    const newOrderData: OrderData = requestBody;

    const newOrder = await db.orders.create({
      data: {
        idTable: newOrderData.idTable,
        fecha: newOrderData.fecha || new Date(), // Asignar la fecha actual si no está presente
        total: newOrderData.total || 0, // Calcular el total de la orden
        numPersons: newOrderData.numPersons,
        paymentType: newOrderData.paymentType,
        orderType: newOrderData.orderType,
        status: newOrderData.status, // Incluir la propiedad status
        active: newOrderData.active,
        // Crear los registros de órdenes de platos
        OrdersDishes: {
          create: newOrderData.dishes.map((dish) => ({
            idDish: dish.idDish,
            count: dish.count,
            comment: dish.comment
          }))
        }
      },
      include: {
        OrdersDishes: {
          include: {
            Dishes: true
          }
        }
      }
    });

    // Retornar la nueva orden creada
    return NextResponse.json(newOrder);
  } catch (error) {
    console.error("Error al crear la orden:", error);
    return NextResponse.error();
  }
}