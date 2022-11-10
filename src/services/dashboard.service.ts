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

const dataByStore = async (query: any, params: any) => {
  const { id } = params;
  const { range } = query;
  let dates : string[]= getDate(range)
  let data : any = {
    total: 0,
    payed: 0,
    debt: 0
  }
  console.log(id);
  
  let result = await prisma.order.aggregate({
    where: {
      AND:{
        storeId:id,
        date:{
          gte:new Date(dates[0]),
          lte:new Date(dates[1])
        }
      }
    },
    _sum: {
      debt: true,
      payed: true,
      total: true
    },
  });
  return result;
};

const  getDate  = (range: string) : string[] => {
  let date = new Date()
  let temp;
  switch (range) {
    case "MONTH":
      let month = date.getMonth() + 1;
      let year = date.getFullYear()
      let endMonth = month == 12 ? 1 : month+1;
      let endYear = endMonth == 12 ? year+1 : year;
      let initDate  = year.toString() + "-" + month.toString() + "-" + "1"
      let endDate  = endYear.toString() + "-" + endMonth.toString() + "-" + "1"

      return [initDate, endDate]
      break;
    case "YEAR":
      let year2 = date.getFullYear()
      let endYear2 =year2+1;
      let initDate2  = year2.toString() + "-01-1"
      let endDate2  = endYear2.toString() + "-01-1"

      return [initDate2, endDate2]
    default:
      return ["2022-01-01", date.toISOString()]
      break;
  }
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
  dataByStore
};
