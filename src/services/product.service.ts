import { PrismaClient, unit } from "@prisma/client";

const prisma = new PrismaClient();

const createProduct = async (body: any) => {
  let result = await prisma.product.create({
    data: body,
  });
  return result;
};

const updateProduct = async (body: any) => {
  const { name, price, unit, weight, pieces, categoryId, storeId, id } = body;
  let result = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      storeId: storeId,
      price: price,
      unit: unit,
      weight: weight,
      pieces: pieces,
      categoryId: categoryId,
    },
  });
  return result;
};

const deleteProduct = async (params: any) => {
  const { id } = params;
  let result = await prisma.product.delete({
    where: { id: id },
  });
  return result;
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
};
