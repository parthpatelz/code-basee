// pages/api/bookings.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log("data", req.body);
    const { date, nutritionistId, details, userId } = req.body;

    try {
      const booking = await prisma.booking.create({
        data: {
          date: new Date(date), // Ensure date is a Date object
          details,
          nutritionist: {
            connect: { id: nutritionistId }
          },
          user: {
            connect: { id: userId }
          },
        },
      });
      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create booking' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
