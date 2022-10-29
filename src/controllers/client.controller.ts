"use strict";

import { validationResult } from "express-validator";
import clientService from "../services/client.service";
/**
 * @author Luis Montes
 *
 */
const createClient = async (req: any, res: any) => {
  try {
    let result = await clientService.createClient(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateClient = async (req: any, res: any) => {
  try {
    let result = await clientService.updateClient(req.body, req.params);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteClient = async (req: any, res: any) => {
  try {
    let result = await clientService.deleteClient(req.params);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const listClients = async (req: any, res: any) => {
  try {
    let result = await clientService.listClients();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getClient = async (req: any, res: any) => {
  try {
    let result = await clientService.getClient(req.params);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default {
  createClient,
  updateClient,
  deleteClient,
  listClients,
  getClient,
  
};
