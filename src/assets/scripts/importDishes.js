const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const importDishes = async () => {
  try {
    const filePath = path.join(__dirname, 'app/api/apiDishes.json'); 
    // MOVER ESTE ARCHIVO A SRC para ver correctamente la ruta
    // EJERCUTAR ARCHIVO node importDishes.js
    console.log('filePath:::', filePath)
    const data = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(data);

    const dishes = parsedData.data.dishes;

    for (const dish of dishes) {
      await prisma.dishes.create({
        data: {
          idDish: dish.idDish,
          name: dish.name,
          price: parseFloat(dish.price),
          urlImagen: dish.urlImagen || null,
          description: dish.description || null,
          idCategory: dish.idCategory,
          active: dish.active,
        },
      });
    }

    console.log('Dishes imported successfully');
  } catch (error) {
    console.error('Error importing dishes:', error);
  } finally {
    await prisma.$disconnect();
  }
};

importDishes();