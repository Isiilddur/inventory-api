"use strict";

import { validationResult } from "express-validator";
import userService from "../services/user.service";
/**
 * @author Luis Montes
 *
 */
const createUser = async (req: any, res: any) => {
  try {
    let result = await userService.createUser(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateUser = async (req: any, res: any) => {
  try {
    let result = await userService.updateUser(req.body, req.params);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUser = async (req: any, res: any) => {
  try {
    let result = await userService.deleteUser(req.params);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const listUsers = async (req: any, res: any) => {
  try {
    let result = await userService.listUsers();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getUser = async (req: any, res: any) => {
  try {
    let result = await userService.getUser(req.params);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default {
  createUser,
  updateUser,
  deleteUser,
  listUsers,
  getUser,
};
