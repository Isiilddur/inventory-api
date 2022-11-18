import { Prisma, PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import productService from "./product.service";

const prisma = new PrismaClient();
const DAYS = 3;
const createOrder = async (body: any) => {
  const { clientId, total, products, storeId } = body;
  let arrayOfProducts = generateArrayProducts(products);

  let result = await prisma.order.create({
    data: {
      clientId: clientId,
      total: total,
      products: {
        create: arrayOfProducts,
      },
      debt: total,
      storeId: storeId,
      date: new Date(new Date().toLocaleDateString())
    },
  }).then( async () => {
    await reduceStock(arrayOfProducts);
  });
  return result;
};

const reduceStock = async (products: any[]) => {
  for(let product of products){
   await productService.decreaseStock(product.productId, product.quantity)
  }
}

const generateArrayProducts = (products: any[]) => {
  return products.map((product) => {
    return {
      productId: product.id,
      quantity: product.quantity,
      price: product.price * product.quantity,
      categoryId: product.categoryId,
      date: new Date(new Date().toLocaleDateString())
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

const listOrdersWithMoreThanXDays = async () => {
  let date = new Date()
  date.setDate(date.getDate()-DAYS)
  let result = await prisma.order.updateMany({
    data:{
      status: "DELAYED"
    },
    where: {
      AND:{
        date: {
          lte:new Date(date),
        },
        NOT: {status: "PAYED"}
      }
    },
  });
  return result;
}

const getStatusClient = async () => {
  let ordersDelayed = await prisma.order.groupBy({
    by: ['clientId'],
    where: {
      NOT:{status: "PAYED"}
    },
    _sum: {
      debt: true,
    },
  })
  return ordersDelayed 
}

export default {
  createOrder,
  updateOrder,
  deleteOrder,
  listOrders,
  getOrder,
  listOrdersByClient,
  listOrdersByStatus,
  listOrdersBetweenDates,
  listOrdersWithMoreThanXDays,
  getStatusClient
};
