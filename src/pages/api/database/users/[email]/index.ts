import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await prisma.$connect();
    const { email } = req.query;

    switch (req.method) {
      // Get links by User
      case "GET":
        const links = await prisma.user.findFirst({
          where: {
            email: `${email}`,
          },
          select: {
            links: true,
          },
        });

        res.status(200).json(links);
        break;

      default:
        res.status(404);
    }
  } catch (err: any) {
    console.log(err.message);
  }
}