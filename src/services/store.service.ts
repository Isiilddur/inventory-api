import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createStore = async (body: any) => {
  const {  name } = body;
  let result = await prisma.store.create({
    data: {
      name: name
    },
  });
  return result;
};

const updateStore = async (body: any, params: any) => {
    const {  name } = body;
    let result = await prisma.store.update({
    where: {
      id: params.id,
    },
    data: {
        name: name
    },
  });
  return result;
};

const deleteStore = async (params: any) => {
  const { id } = params;
  let result = await prisma.store.delete({
    where: {
      id: id,
    },
  });
  return result;
};

const listStores = async () => {
  let result = await prisma.store.findMany();
  return result;
};

const getStore = async (params: any) => {
  const { id } = params;
  let result = await prisma.store.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
  return result;
};

export default { createStore, updateStore, deleteStore, listStores, getStore };
