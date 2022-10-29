import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createCategory = async (body: any) => {
  const {  name } = body;
  let result = await prisma.category.create({
    data: {
      name: name

    },
  });
  return result;
};

const updateCategory = async (body: any, params: any) => {
    const {  name } = body;
    let result = await prisma.category.update({
    where: {
      id: params.id,
    },
    data: {
        name: name
    },
  });
  return result;
};

const deleteCategory = async (params: any) => {
  const { id } = params;
  let result = await prisma.category.delete({
    where: {
      id: id,
    },
  });
  return result;
};

const listCategories = async () => {
  let result = await prisma.category.findMany({
    where: { active: true },
  });
  return result;
};

const getCategory = async (params: any) => {
  const { id } = params;
  let result = await prisma.category.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
  return result;
};

export default { createCategory, updateCategory, deleteCategory, listCategories, getCategory };
