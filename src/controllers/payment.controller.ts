"use strict";

import { validationResult } from "express-validator";
import paymentService from "../services/payment.service";
/**
 * @author Luis Montes
 *
 */
const createPayment = async (req: any, res: any) => {
  try {
    let result = await paymentService.createPayment(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updatePayment = async (req: any, res: any) => {
  try {
    let result = await paymentService.updatePayment(req.body, req.params);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletePayment = async (req: any, res: any) => {
  try {
    let result = await paymentService.deletePayment(req.params);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const listPayments = async (req: any, res: any) => {
  try {
      (req);
      
    let result = await paymentService.listPayments();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const listPaymentsByClient = async (req: any, res: any) => {
    try {
      let result = await paymentService.getPaymentsByClient(req.params);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  const listPaymentsWithDebths = async (req: any, res: any) => {
    try {
      let result = await paymentService.getClientsWithDebths();
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  };


const getPayment = async (req: any, res: any) => {
  try {
    let result = await paymentService.getPayment(req.params);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};



export default {
  createPayment,
  updatePayment,
  deletePayment,
  listPayments,
  listPaymentsByClient,
  getPayment,
  
};
