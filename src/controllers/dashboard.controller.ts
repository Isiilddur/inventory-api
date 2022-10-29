"use strict";

import { validationResult } from "express-validator";
import dashboardService from "../services/dashboard.service";
/**
 * @author Luis Montes
 *
 */
const ordesToReceive = async (req: any, res: any) => {
  try {
    let result = await dashboardService.ordesToReceive();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};
const incomeByDate = async (req: any, res: any) => {
    try {
      let result = await dashboardService.incomeByDate(req.query);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  };

// const updateOrder = async (req: any, res: any) => {
//   try {
//     let result = await orderService.updateOrder(req.body, req.params);
//     res.status(200).send(result);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// const deleteOrder = async (req: any, res: any) => {
//   try {
//     let result = await orderService.deleteOrder(req.params);
//     res.status(200).send(result);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// const listOrders = async (req: any, res: any) => {
//   try {
//       (req);
      
//     let result = await orderService.listOrders();
//     res.status(200).send(result);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// const listOrdersByClient = async (req: any, res: any) => {
//     try {
//       let result = await orderService.listOrdersByClient(req.params);
//       res.status(200).send(result);
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   };

//   const listOrdersByStatus = async (req: any, res: any) => {
//     try {
//       let result = await orderService.listOrdersByStatus(req.params);
//       res.status(200).send(result);
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   };

// const getOrder = async (req: any, res: any) => {
//   try {
//     let result = await orderService.getOrder(req.params);
//     res.status(200).send(result);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// const listOrdersBetweenDates = async (req: any, res: any) => {
//     try {
//         let result = await orderService.listOrdersBetweenDates(req.query);
//         res.status(200).send(result);
//     } catch (error) {
//         res.status(400).send(error);

//     }
// }

export default {
    ordesToReceive,
    incomeByDate
  
};
