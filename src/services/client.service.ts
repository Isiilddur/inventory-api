import { PrismaClient } from "@prisma/client";
import { log } from "console";

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

const updateClientDebt = async (clientId: string, total: number) => {
  let client =await prisma.client.findFirst({where:{id:clientId}})
  console.log(total);
  
  let debt = Number(client?.debt) + Number(total)

  console.log(debt);
  
  let result = await prisma.client.update({
    where: {
      id: clientId
    },
    data: {
      debt: debt,
      status: "ON_TIME"
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

const listClientsWithMoreThanXDays = async () => {
  let date = new Date()
  date.setDate(date.getDate()-3)
  let result = await prisma.client.updateMany({
    data:{
      status:"DELAYED"
    },
    where:{
      AND: {
        lastStatusUpdate:{
          lte:date,
        },
        debt:{
          gt:0
        }
      }
    }
  })
  return result;
}

export default {
  createClient,
  updateClient,
  deleteClient,
  listClients,
  getClient,
  updateClientDebt,
  listClientsWithMoreThanXDays
};
