import { NextResponse } from "next/server";
import db from "@/libs/db";
import { NextApiRequest } from 'next';

interface Dish {
  idDish: number;
  count: number;
  price: number;
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

// Función para obtener todas las órdenes o la última orden que cumpla con los criterios especificados
export async function GET(request: NextApiRequest) {
  try {
    // const { idtable } = request.query;

    if (request.url === undefined) {
      throw new Error('URL de solicitud indefinida');
    }
    const {searchParams} = new URL(request.url)
    const idTable = searchParams.get('idtable')

    // Si idTable no está presente en la consulta, devolver todas las órdenes
    if (!idTable) {
      // Buscar todas las órdenes
      console.log('entroo');
      
      const orders = await db.orders.findMany({
        include: {
          OrdersDishes: {
            include: {
              Dishes: true
            }
          }
        }
      });
      // Retornar las órdenes
      return NextResponse.json(orders);
    }
    console.log('entroo2');

    // Buscar la última orden que cumpla con los criterios especificados
    const order = await db.orders.findFirst({
      where: {
        idTable: Number(idTable),
        status: 'OPEN'
      },
      orderBy: {
        fecha: 'desc' // Ordenar por fecha descendente para obtener la última orden
      },
      include: {
        OrdersDishes: {
          include: {
            Dishes: true
          }
        }
      }
    });
    console.log('order:::', order);

    if (!order) {
      // return NextResponse.json({ error: 'No se encontró ninguna orden para la mesa especificada con status OPEN' }, { status: 404 });
      return NextResponse.json(null);
    }

    // Retornar la última orden encontrada
    return NextResponse.json(order);
  } catch (error) {
    console.error("Error al obtener la orden:", error);
    return NextResponse.error();
  }
}

// Función para crear una nueva orden
export async function POST(request: NextApiRequest) {
  try {
    const requestBody = request.body;
    if (!requestBody) {
      throw new Error('No hay datos en el cuerpo de la solicitud');
    }
    // Obtener los datos de la nueva orden desde el cuerpo de la solicitud
    const newOrderData = JSON.parse(requestBody);

    // Crear la nueva orden en la base de datos
    const newOrder = await db.orders.create({
      data: {
        idTable: newOrderData.idTable,
        fecha: new Date(), // Asignar la fecha actual
        total: calculateTotal(newOrderData), // Calcular el total de la orden
        numPersons: newOrderData.numPersons,
        paymentType: newOrderData.paymentType,
        orderType: newOrderData.orderType,
        status: newOrderData.status, // Incluir la propiedad status
        active: newOrderData.active,
        // Crear los registros de órdenes de platos
        OrdersDishes: {
          createMany: {
            data: newOrderData.dishes.map((dish: Dish) => ({
              idDish: dish.idDish,
              count: dish.count
            }))
          }
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

// Función para calcular el total de la orden
function calculateTotal(orderData: OrderData) {
  return orderData.dishes.reduce((total, dish) => {
    return total + dish.price * dish.count;
  }, 0);
}