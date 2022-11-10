
import { order, PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import orderService from "./order.service";

const prisma = new PrismaClient();

const getClientsWithDebths = async () => {
    let result = await prisma.order.findMany({
        where:{
            status: "DELAYED"
        },
        include:{
            client: true
        }
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
        resStr += counter + ". " +  item.client.name + " \t $" + (item.total - item.payed) + "\n"
    }
    return resStr;

}

const createPayment = async (body: any) => {
    const { amount, orderId, clientId } = body;
    let result = await prisma.payments.create({
      data: {
        amount: amount,
        orderId: orderId,
        clientId: clientId
      },
    })
    let order = await orderService.getOrder({id:orderId})
    let payed = Number(order.payed) + Number(amount)
    console.log(amount + " " + payed);
    let debt = Number(order.total) - payed
    let status = payed >= Number(order.total) ? "PAYED" : order.status;
    await prisma.order.update
    ({
      where: {id:orderId},
      data:{
        payed : payed,
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
        orderId: orderId
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

