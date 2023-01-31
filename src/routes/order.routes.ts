import express from "express";
import { body, check } from "express-validator";
const orderRoutes = express.Router();

import orderController from "../controllers/order.controller";
import validateFields from "../middlewares/validate-fields";

let validationOrder: any[] = [
  check("clientId", "El cliente es necesario").exists(),
  check("products", "Debe tener al menos un producto").isArray(),
  validateFields,
];

const idValidation: any[] = [
  check("id", "El Id no es valido o no existe").exists().isUUID(),
];

orderRoutes.post("/order", validationOrder, orderController.createOrder);

orderRoutes.delete(
  "/order/:id",
  idValidation.concat(validateFields),
  orderController.deleteOrder
);
orderRoutes.get("/orders", orderController.listOrders);
orderRoutes.get(
  "/order/:id",
  idValidation.concat(validateFields),
  orderController.getOrder
);
orderRoutes.get(
  "/orders/client/:id",
  idValidation.concat(validateFields),
  orderController.listOrdersByClient
);
orderRoutes.get(
  "/orders/:status",
  idValidation.concat(validateFields),
  orderController.listOrdersByStatus
);

orderRoutes.get("/datesFilt/orders", orderController.listOrdersBetweenDates);



export default orderRoutes;
