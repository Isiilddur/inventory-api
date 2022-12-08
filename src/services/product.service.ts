import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

const prisma = new PrismaClient();

const createProduct = async (body: any) => {
  let result = await prisma.product.create({
    data: body,
  });
  return result;
};

const updateProduct = async (body: any) => {
  const { name, categoryId, storeId, id } = body;
  let result = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      storeId: storeId,
      categoryId: categoryId,
    },
  });
  return result;
};

const deleteProduct = async (params: any) => {

  const { id } = params;
  try {
    let result = await prisma.product.delete({
      where: { id: id },
    });
    return result;
  } catch (error) {
    throw new Error("Este producto está relacionado a mas ordenes")
  }
  
};

const findProduct = async (params: any) => {
  const { id } = params;
  let result = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const listProducts = async (params: any) => {
    console.log(params);
    
    let query =generateQuery(params)
    console.log(query);
    
  let result = await prisma.product.findMany(query);
  return result;
};

const listProductsInOrder = async (params: any) => {
  
  let {id} = params
  
let result = await prisma.products_on_orders.findMany({
  where: {orderId:id}, include:{product: true}
});
return result;
};

const increaseStock = async (body: any, params: any) => {
  const { id } = params;
  const { amount } = body;

  let query =generateQuery(params)
  console.log(query);
  
let result = await prisma.product.findUniqueOrThrow({
  where:{
    id: id
  }
})
  result = await prisma.product.update({
    data:{stock:new Decimal(result?.stock).plus(amount) },
    where: {id:id}
  });
  return result;
};

const decreaseStock = async (id: any, amount: number) => {
  
let result = await prisma.product.findUniqueOrThrow({
  where:{
    id: id
  }
})
let decimalAmount = new Decimal(result?.stock).minus(amount)
  result = await prisma.product.update({
    data:{stock:decimalAmount},
    where: {id:id}
  });
  return decimalAmount;
};

const generateQuery = (params: any) => {
    debugger;
  let { storeId, categoryId } = params;
  console.log(storeId, categoryId);
  
  let query = {};
  if (!storeId && !categoryId) {
    return query;
  }
  if (storeId && categoryId) {
    query = {
      where: {
        AND: {
          storeId: storeId,
          categoryId: categoryId,
        },
      },
    };
  }
  else if (storeId) {
    query = {
      where: {
        storeId: storeId,
      },
    };
  }
  else if (categoryId) {
    query = {
      where: {
        categoryId: categoryId,
      },
    };
  }
  console.log(query);
  
  return query;
};

export default {
  createProduct,
  updateProduct,
  deleteProduct,
  findProduct,
  listProducts,
  increaseStock,
  decreaseStock,
  listProductsInOrder
};
