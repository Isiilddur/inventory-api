import { PrismaClient } from "@prisma/client";
import User from "../models/User";

const prisma = new PrismaClient();

const createUser = async (body: any) => {
  const { username, password, name, phone, role } = body;
  let result = await prisma.user.create({
    data: {
      username: username,
      password: password,
      name: name,
      phone: phone,
      role: role,
    },
  });
  return result;
};

const updateUser = async (body: any, params: any) => {
  const { username, password, name, phone, role } = body;
  let result = await prisma.user.update({
    where: {
      id: params.id,
    },
    data: {
      id: params.id,
      username: username,
      password: password,
      name: name,
      phone: phone,
      role: role,
    },
  });
  return result;
};

const deleteUser = async (params: any) => {
  const { id } = params;
  let result = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return result;
};

const listUsers = async () => {
  let result = await prisma.user.findMany({
    where: { active: true },
  });
  return result;
};

const getUser = async (params: any) => {
  const { id } = params;
  let result = await prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
  return result;
};

export default { createUser, updateUser, deleteUser, listUsers, getUser };
