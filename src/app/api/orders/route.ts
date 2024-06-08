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
  fecha?: string;
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
        fecha: newOrderData.fecha, 
        total: newOrderData.total || 0,
        numPersons: newOrderData.numPersons,
        paymentType: newOrderData.paymentType,
        orderType: newOrderData.orderType,
        status: newOrderData.status, 
        active: newOrderData.active,
        OrdersDishes: {
          create: newOrderData.dishes.map((dish) => ({
            idDish: dish.idDish,
            count: dish.count,
            comment: dish.comment,
            price: Number(dish.price)
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

    return NextResponse.json(newOrder);
  } catch (error) {
    console.error("Error al crear la orden:", error);
    return NextResponse.error();
  }
}

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  try {
    const whereClause: any = {};

    if (startDate && endDate) {
      const startDateWithTime = `${startDate} 00:00:00`;
      const endDateWithTime = `${endDate} 23:59:59`;

      whereClause.fecha = {
        gte: startDateWithTime,
        lte: endDateWithTime
      };
    } else {
      throw new Error('Both startDate and endDate must be provided.');
    }

    const orders = await db.orders.findMany({
      where: whereClause,
      include: {
        OrdersDishes: {
          include: {
            Dishes: true,
          },
        },
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    return NextResponse.error();
  }
}
