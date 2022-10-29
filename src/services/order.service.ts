import { Prisma, PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

const prisma = new PrismaClient();

const createOrder = async (body: any) => {
  const { clientId, total, products } = body;
  let arrayOfProducts = generateArrayProducts(products);

  let result = await prisma.order.create({
    data: {
      clientId: clientId,
      total: total,
      products: {
        create: arrayOfProducts,
      },
    },
  });

  return result;
};

const generateArrayProducts = (products: any[]) => {
  return products.map((product) => {
    return {
      productId: product.id,
      quantity: product.quantity,
    };
  });
};

const updateOrder = async (body: any, params: any) => {
  const { status } = body;
  let result = await prisma.order.update({
    where: {
      id: params.id,
    },
    data: {
      status: status,
    },
  });
  return result;
};

const deleteOrder = async (params: any) => {
  const { id } = params;
  let result = await prisma.order.delete({
    where: {
      id: id,
    },
  });
  return result;
};

const listOrders = async () => {
  let result = await prisma.order.findMany();
  return result;
};

const listOrdersByClient = async (params: any) => {
  let { id } = params;
  let result = await prisma.order.findMany({
    where: { clientId: id },
  });
  return result;
};

const listOrdersByStatus = async (params: any) => {
  let { status } = params;

  let result = await prisma.order.findMany({
      where:{status:status}
  });
  return result;
};

const getOrder = async (params: any) => {
  const { id } = params;
  let result = await prisma.order.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
  return result;
};

const listOrdersBetweenDates = async (params: any) => {
  const { initDate ,  endDate } = params;
  
  let result = await prisma.order.findMany({
    where: {
      date: {
        gte: new Date(initDate),
        lte:new Date(endDate),
      }
    },
  });
  return result;
}

export default {
  createOrder,
  updateOrder,
  deleteOrder,
  listOrders,
  getOrder,
  listOrdersByClient,
  listOrdersByStatus,
  listOrdersBetweenDates
};
