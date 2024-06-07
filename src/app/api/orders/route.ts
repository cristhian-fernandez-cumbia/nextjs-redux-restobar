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
  try {
    // const filterDate = request.query.date ? new Date(request.query.date) : new Date();
    // const startDate = new Date(filterDate.getFullYear(), filterDate.getMonth(), filterDate.getDate(), 0, 0, 0);
    // const endDate = new Date(filterDate.getFullYear(), filterDate.getMonth(), filterDate.getDate(), 23, 59, 59);
    const orders = await db.orders.findMany({
      // where: {
      //   fecha: {
      //     gte: startDate.toISOString(), 
      //     lte: endDate.toISOString(),   
      //   },
      // },
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