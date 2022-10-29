import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createClient = async (body: any) => {
  const { name, rfc, phone, address } = body;
  let result = await prisma.client.create({
    data: {
      name: name,
      rfc: rfc,
      phone: phone,
      address: address,
    },
  });

  return result;
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
  createClient,
  updateClient,
  deleteClient,
  listClients,
  getClient,
};
