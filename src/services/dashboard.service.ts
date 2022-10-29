import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ordesToReceive = async () => {
  let result = await prisma.order.findMany({
    where: {
      OR: {
        status: {
          in: ["ON_TIME", "DELAYED"],
        },
      },
    },
  });

  return result;
};
const incomeByDate = async (params: any) => {
  let { initDate, endDate, payed } = params;

  if (payed) {
    return await prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: {
        AND: {
          date: {
            gte: new Date(initDate),
            lte: new Date(endDate),
          },
          status: "PAYED",
        },
      },
    });
  } else {
    return await prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: {
        date: {
          gte: new Date(initDate),
          lte: new Date(endDate),
        },
      },
    });
  }
};

const updateClient = async (body: any, params: any) => {
  const { name, rfc, phone, address } = body;
  let result = await prisma.client.update({
    where: {
      id: params.id,
    },
    data: {
      name: name,
      rfc: rfc,
      phone: phone,
      address: address,
    },
  });
  return result;
};

const deleteClient = async (params: any) => {
  const { id } = params;
  let result = await prisma.client.delete({
    where: {
      id: id,
    },
  });
  return result;
};

const listClients = async () => {
  let result = await prisma.client.findMany();
  return result;
};

const getClient = async (params: any) => {
  const { id } = params;
  let result = await prisma.client.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
  return result;
};

export default {
  ordesToReceive,
  incomeByDate,
};
