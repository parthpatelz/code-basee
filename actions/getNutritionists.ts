import prisma from '../libs/prismadb';

export default async function getNutritionists() {
  try {
    const nutritionists = await prisma.nutritionist.findMany();
    return nutritionists;
  } catch (error) {
    console.error('Error fetching nutritionists:', error);
    throw new Error('Error fetching nutritionists');
  }
}
