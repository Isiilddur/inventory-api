import express from "express";
import { body, check } from "express-validator";
import dashboardController from "../controllers/dashboard.controller";
const dashboardRoutes = express.Router();

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


dashboardRoutes.get("/dashboard/ordersToReceive", dashboardController.ordesToReceive);
dashboardRoutes.get("/dashboard/incomeByDate", dashboardController.incomeByDate);


export default dashboardRoutes;
