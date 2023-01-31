
import { order, PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import orderService from "./order.service";

const prisma = new PrismaClient();

const getClientsWithDebths = async () => {
    let result = await prisma.client.findMany({
        where:{
            status: "DELAYED"
        },
    })
    return buildMessage(result)
}

const buildMessage = (result: any[]) => {
    let resStr = "****Cuentas vencidas****\n"
    let counter = 0
    if(result.length == 0)
    return "SIN ADEUDOS"
    for(let item of result){
        counter++;
        resStr += counter + ". " +  item.name + " \t $" + (item.debt) + "\n"
    }
    return resStr;

}

const createPayment = async (body: any) => {
    const { amount, clientId } = body;
    let result = await prisma.payments.create({
      data: {
        amount: amount,
        clientId: clientId
      },
    })
    let client = await prisma.client.findUnique({
      where:{
        id:clientId
      }
    })
    let debt = Number(client?.debt) - amount
    let status = debt >= 0 ? "PAYED" : client?.status;
    await prisma.client.update
    ({
      where: {id:clientId},
      data:{
        status: status,
        debt: debt
      }
    })
    return result;
  };
  
  const updatePayment = async (body: any, params: any) => {
    const { amount, orderId } = body;
    let result = await prisma.payments.update({
      where: {
        id: params.id,
      },
      data: {
        amount: amount,
      },
    });
    return result;
  };
  
  const deletePayment = async (params: any) => {
    const { id } = params;
    let result = await prisma.payments.delete({
      where: {
        id: id,
      },
    });
    return result;
  };
  
  const listPayments = async () => {
    let result = await prisma.payments.findMany();
    return result;
  };
  
  const getPayment = async (params: any) => {
    const { id } = params;
    let result = await prisma.payments.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return result;
  };

  const getPaymentsByClient = async (params: any) => {
    const { clientId } = params;
    let result = await prisma.payments.findMany({
      where: {
        clientId: clientId,
      },
    });
    return result;
  };


export default {
    getClientsWithDebths,
    createPayment,
    deletePayment,
    updatePayment,
    getPayment,
    listPayments,
    getPaymentsByClient
}

