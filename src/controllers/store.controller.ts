"use strict";

import { validationResult } from "express-validator";
import storeService from "../services/store.service";
/**
 * @author Luis Montes
 *
 */
const createStore = async (req: any, res: any) => {
  try {
    let result = await storeService.createStore(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateStore = async (req: any, res: any) => {
  try {
    let result = await storeService.updateStore(req.body, req.params);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteStore = async (req: any, res: any) => {
  try {
    let result = await storeService.deleteStore(req.params);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const listStores = async (req: any, res: any) => {
  try {
    let result = await storeService.listStores();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getStore = async (req: any, res: any) => {
  try {
    let result = await storeService.getStore(req.params);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default {
  createStore,
  updateStore,
  deleteStore,
  listStores,
  getStore,
};
